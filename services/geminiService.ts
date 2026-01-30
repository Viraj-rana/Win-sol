import { GoogleGenAI, Type } from "@google/genai";
import { ReviewResult, ReviewStatus, Severity, ProjectAnalysisResult, ReviewIssue } from "../types";

// --- Rate Limiter (Token Bucket Algorithm) it works every minutes 15 tokens per request/sec---
class TokenBucket {
  private capacity: number;
  private tokens: number;
  private lastRefill: number;
  private refillRateMs: number;

  constructor(capacity: number, tokensPerMinute: number) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.lastRefill = Date.now();
    this.refillRateMs = (60 * 1000) / tokensPerMinute;
  }

  async acquireToken(): Promise<void> {
    this.refill();

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return;
    }

    const now = Date.now();
    const timeSinceLastRefill = now - this.lastRefill;
    const waitTime = this.refillRateMs - timeSinceLastRefill;

    if (waitTime > 0) {
      // Wait for the next token to regenerate
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.acquireToken();
    } else {
      return this.acquireToken();
    }
  }

  private refill() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    const newTokens = Math.floor(elapsed / this.refillRateMs);

    if (newTokens > 0) {
      this.tokens = Math.min(this.capacity, this.tokens + newTokens);
      this.lastRefill = now;
    }
  }
}

// Initialize: 15 tokens per minute (Free Tier Limit), Max Burst 15
const rateLimiter = new TokenBucket(15, 15);

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Switched to Flash for higher stability and speed with large contexts in web environments
const MODEL_NAME = "gemini-3-flash-preview"; 

// Safety limit for browser-based XHR requests to avoid "RPC Failed" errors
const MAX_CHAR_LIMIT = 45000; 

const truncatePayload = (text: string): string => {
  if (text.length <= MAX_CHAR_LIMIT) return text;
  return text.substring(0, MAX_CHAR_LIMIT) + "\n\n...[Diff Truncated by System due to Network Payload Limits]...";
};

const handleApiError = (error: any) => {
  const msg = error.message || "";
  if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
    throw new Error("Rate limit exceeded. Please wait 60 seconds and try again.");
  }
  if (msg.includes("Rpc failed") || msg.includes("xhr error") || msg.includes("error code: 6")) {
    throw new Error("Network Payload Error: The code diff is too large for the web connection, or an AdBlocker is blocking the Google AI API. Please try a smaller diff.");
  }
  throw new Error(msg || "An unexpected error occurred during AI analysis.");
};

export const analyzeCode = async (
  styleGuide: string,
  codeDiff: string,
  blockOnWarning: boolean
): Promise<ReviewResult> => {
  await rateLimiter.acquireToken();
  const ai = getAI();
  const safeDiff = truncatePayload(codeDiff);

  const systemInstruction = `
    You are a World-Class Senior Principal Engineer and Software Architect. 
    Analyze the provided code diff against the style guide.
    
    TASK: Generate a comprehensive code review AND a high-fidelity visual Impact Graph.
    
    CRITICAL STATUS RULES:
    1. If ANY issue is detected with severity 'CRITICAL', the status MUST be 'REQUEST_CHANGES'.
    2. If issues are only 'WARNING' or 'INFO', the status MUST be 'APPROVE'.
    3. If no issues are found, the status MUST be 'APPROVE'.
    
    IMPACT GRAPH REQUIREMENTS (Mermaid 'graph TD'):
    1. FORMAT: Strictly use 'graph TD' as the first line.
    2. HIERARCHY: Map from 'System/Module' -> 'File' -> 'Impacted Function/Logic Block'.
    3. RIPPLE EFFECT: Use arrows to show how the changes propagate to consumers or downstream dependencies. 
       - CRITICAL: Add labels to arrows explaining the relationship (e.g., A -- "calls" --> B, C -- "imports" --> D).
    4. VISUAL HIGHLIGHTING (Strictly use these classes):
       - direct: for nodes directly modified in the diff.
       - ripple: for nodes NOT modified but logically impacted (downstream effects).
       - context: for stable components that are dependencies but remain unchanged.
       
    Define these classes at the start of your graph (immediately after graph TD):
    classDef direct fill:#ef4444,stroke:#7f1d1d,stroke-width:2px,color:#fff;
    classDef ripple fill:#f97316,stroke:#7c2d12,stroke-width:2px,color:#fff;
    classDef context fill:#f1f5f9,stroke:#64748b,stroke-width:1px,color:#475569;
    
    5. ANNOTATIONS: Use highly descriptive labels.
    
    CRITICAL MERMAID SYNTAX RULES:
    1. Do NOT use markdown code blocks (\`\`\`) in the JSON string property.
    2. Ensure the string uses \\n for newlines, NOT literal newlines.
    3. USE SAFE IDs: Use simple alphanumeric IDs (e.g. NodeA, NodeB) without spaces for the node definitions.
    4. LABELS: Define the text label in brackets/quotes: NodeA["Label Text"].
    5. CLASSES: Attach classes to the ID only: NodeA:::direct
    6. Do NOT attach classes to strings like "Label":::class.
    
    Output strictly in JSON format.
  `;

  const prompt = `
    **Engineering Style Guide:** ${styleGuide}
    **Code Diff to Review (Truncated if too large):** ${safeDiff}
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0, // Deterministic output
        seed: 42,       // Fixed seed for consistency
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            status: { type: Type.STRING, enum: [ReviewStatus.APPROVE, ReviewStatus.REQUEST_CHANGES] },
            markdownReport: { type: Type.STRING },
            impactGraphMermaid: { type: Type.STRING },
            issues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  codeSnippet: { type: Type.STRING },
                  message: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: [Severity.INFO, Severity.WARNING, Severity.CRITICAL] },
                  ruleReference: { type: Type.STRING },
                },
                required: ["codeSnippet", "message", "severity"]
              }
            }
          },
          required: ["summary", "status", "issues", "markdownReport", "impactGraphMermaid"]
        }
      }
    });
//algorithm to analyze code diffs
    const text = response.text;
    if (!text) throw new Error("Empty response from AI engine.");
    return JSON.parse(text) as ReviewResult;
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const translateReviewResult = async (result: ReviewResult, targetLang: string): Promise<ReviewResult> => {
  await rateLimiter.acquireToken();
  const ai = getAI();
  const systemInstruction = `You are a Technical Translator. Translate the provided JSON review result into ${targetLang}. 
  Maintain all technical terms, code snippets, and Mermaid syntax exactly as they are. 
  ONLY translate the 'summary', 'markdownReport', and the 'message' field in the 'issues' array.
  Return the result in the exact same JSON format.`;
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: JSON.stringify(result),
      config: {
        systemInstruction,
        temperature: 0,
        responseMimeType: "application/json"
      }
    });
    const text = response.text;
    if (!text) return result;
    return JSON.parse(text) as ReviewResult;
  } catch (error) {
    console.error("Translation failed", error);
    return result;
  }
};

export const generateFix = async (
  styleGuide: string,
  originalContext: string,
  issue: ReviewIssue
): Promise<string> => {
  await rateLimiter.acquireToken();
  const ai = getAI();
  const systemInstruction = `
    You are a Senior Refactoring Specialist. 
    Provide a corrected version of the code snippet.
    ONLY return raw code. No markdown backticks.
  `;

  const prompt = `
    **Style Guide:** ${styleGuide}
    **Context (Truncated):** ${truncatePayload(originalContext)}
    **Issue:** ${issue.message}
    **Code:** ${issue.codeSnippet}
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: { 
        systemInstruction,
        temperature: 0 
      }
    });
    return response.text?.trim() || "Unable to generate fix.";
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const analyzeRepository = async (
  repoName: string,
  fileTree: string,
  keyFileContents: string
): Promise<ProjectAnalysisResult> => {
  await rateLimiter.acquireToken();
  const ai = getAI();
  const safeTree = truncatePayload(fileTree);

  const systemInstruction = `
    You are a Technical Architect and Senior Lead Documentation Specialist.
    Analyze this repository and provide an exceptionally comprehensive, enterprise-grade technical report.
    
    1. 'suggestedReadme': Generate an industry-standard Markdown README.md. It MUST be highly detailed:
       - Executive Summary: A high-level value proposition and "what is this?".
       - Architectural Blueprint: Deep-dive into the mental model, design patterns (Clean Arch, DDD, etc.), and overall strategy.
       - Technical Stack Matrix: Detailed list of core technologies with justifications.
       - Folder Anatomy: Exhaustive breakdown of project structure and file responsibilities.
       - Operational Insights: Security protocols, Performance strategies, and detected optimizations.
       - Developer Journey: Setup, Test Execution, CI/CD suggestions, and Contribution flow.
       - Future Roadmap: Suggested enhancements based on current technical debt or feature gaps.
    
    2. 'architecture': A more technical, concise executive summary of the architectural strategy.
    
    3. 'impactGraphMermaid': Generate a high-fidelity 'graph TD' visualizing directory relationships and internal data flow.
       - STRICTLY START WITH 'graph TD'.
       - Use alphanumeric IDs for nodes (e.g. A, B) and put labels in brackets A["Label"].
       - Do NOT use spaces in node IDs.
    
    Output strictly in JSON format.
  `;
  const prompt = `Repo Name: ${repoName}\nFile Tree:\n${safeTree}\nKey File Context:\n${keyFileContents}`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projectName: { type: Type.STRING },
            description: { type: Type.STRING },
            techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
            architecture: { type: Type.STRING },
            keyFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedReadme: { type: Type.STRING },
            impactGraphMermaid: { type: Type.STRING }
          },
          required: ["projectName", "description", "techStack", "architecture", "keyFeatures", "suggestedReadme", "impactGraphMermaid"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI engine.");
    return JSON.parse(text) as ProjectAnalysisResult;
  } catch (error: any) {
    return handleApiError(error);
  }
};