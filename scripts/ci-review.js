import { GoogleGenAI, Type } from "@google/genai";
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
const API_KEY = process.env.API_KEY; // Gemini Key

// Use provided credentials as default if env vars not present
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://innhtkqrvjqiuuetzxqh.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlubmh0a3FydmpxaXV1ZXR6eHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDk5NzgsImV4cCI6MjA4NTI4NTk3OH0.Q_QHP2LYQjAk0c2u3fijuiYNKlw4kqrW1UqGBxUMfnA';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// GitHub Actions Context
const GITHUB_EVENT_PATH = process.env.GITHUB_EVENT_PATH;

// GitLab CI Context
const GITLAB_CI = process.env.GITLAB_CI;
const CI_MERGE_REQUEST_TITLE = process.env.CI_MERGE_REQUEST_TITLE;
const CI_MERGE_REQUEST_IID = process.env.CI_MERGE_REQUEST_IID;
const GITLAB_USER_LOGIN = process.env.GITLAB_USER_LOGIN;
const CI_PROJECT_NAME = process.env.CI_PROJECT_NAME;

async function run() {
  console.log("🚀 Starting WinSolution AI Automated Review...");

  if (!API_KEY) { console.error("❌ Missing API_KEY"); process.exit(1); }
  if (!SUPABASE_URL || !SUPABASE_KEY) { console.error("❌ Missing Supabase Credentials"); process.exit(1); }

  // 1. Get PR/MR Data
  let prData = { title: "Manual Test", user: { login: "tester" }, number: 0, head: { repo: { name: "test-repo" } } };
  
  if (GITHUB_EVENT_PATH) {
    try {
      const event = JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH, 'utf8'));
      if (event.pull_request) {
        prData = event.pull_request;
        console.log(` Processing GitHub PR #${prData.number}: ${prData.title}`);
      }
    } catch (e) {
      console.error(" Could not read GitHub Event path, using mock data.");
    }
  } else if (GITLAB_CI) {
    console.log("🦊 Detected GitLab CI Environment");
    // Map GitLab variables to our internal data structure
    prData = {
        title: CI_MERGE_REQUEST_TITLE || "Untitled Merge Request",
        user: { login: GITLAB_USER_LOGIN || "gitlab_user" },
        number: CI_MERGE_REQUEST_IID || "0",
        head: { repo: { name: CI_PROJECT_NAME || "gitlab-repo" } }
    };
    console.log(` Processing GitLab MR #${prData.number}: ${prData.title}`);
  }

  // 2. Read Code Diff (In CI, we assume 'git diff' output is piped or fetched)
  let codeDiff = "";
  try {
    codeDiff = fs.readFileSync('pr_diff.txt', 'utf8');
  } catch (e) {
    console.log(" pr_diff.txt not found. Using dummy diff for testing.");
    codeDiff = `
    // DUMMY DIFF
    function insecure() {
      const key = "12345"; // Hardcoded credential
    }
    `;
  }

  if (codeDiff.length > 45000) {
    codeDiff = codeDiff.substring(0, 45000) + "\n...[Truncated]";
  }

  // 3. AI Analysis
  console.log(" Analyzing with Gemini...");
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = `
    You are a World-Class Senior Principal Engineer. Analyze the code diff.
    
    SEVERITY RULES:
    - CRITICAL: Hardcoded API keys/credentials, or fatal logic errors (crashes, infinite loops).
    - INFO: Naming conventions, Type hinting, Docstrings, and Error Handling (bare except).
    - WARNING: All other code quality issues.
    
    STATUS DETERMINATION RULES:
    1. If ANY issue has severity 'CRITICAL' -> status must be 'REQUEST_CHANGES'.
    2. If issues are only 'WARNING' or 'INFO' -> status must be 'APPROVE'.
    3. If no issues -> status must be 'APPROVE'.

    Output strictly in JSON.
    Format requirements:
    - summary: string
    - status: "APPROVE" | "REQUEST_CHANGES"
    - issues: array of objects { message, severity: "CRITICAL"|"WARNING"|"INFO", codeSnippet }
    - markdownReport: string
    - impactGraphMermaid: string (start with graph TD)
  `;

  const prompt = `Review this code diff:\n${codeDiff}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0, // Deterministic output
        seed: 42,       // Fixed seed for consistency
        responseMimeType: "application/json"
      }
    });

    const resultText = response.text;
    const result = JSON.parse(resultText);
    
    console.log(`✅ Analysis Complete. Status: ${result.status}`);

    // 4. Send Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      console.log("📨 Sending Telegram Notification...");
      await sendTelegram(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, prData.user.login, prData.title, result);
    } else {
      console.log("ℹ️ Telegram skipped (Missing credentials)");
    }

    // 5. Save to Supabase
    console.log("💾 Saving to Database...");
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    
    const { error } = await supabase.from('reviews').insert({
      id: Date.now().toString(), // Simple ID
      timestamp: new Date().toISOString(),
      author: prData.user.login,
      project_name: prData.title,
      status: result.status,
      summary: result.summary,
      result_json: result
    });

    if (error) {
      console.error("❌ Supabase Error:", error);
      process.exit(1);
    } else {
      console.log("✅ Saved successfully to Supabase!");
    }

    // 6. CI Exit Logic
    // Fail the pipeline ONLY if status is REQUEST_CHANGES (which implies CRITICAL errors)
    if (result.status === 'REQUEST_CHANGES') {
        console.error("🚨 CRITICAL issues detected. Failing pipeline.");
        process.exit(1);
    } else {
        console.log("✨ Pipeline Passed (Only Warnings/Info or Clean).");
        process.exit(0);
    }

  } catch (error) {
    console.error("❌ Fatal Error:", error);
    process.exit(1);
  }
}

// Helper: Minimal Telegram Sender
async function sendTelegram(token, chatId, author, project, result) {
  const emoji = result.status === 'APPROVE' ? '✅' : '❌';
  const summary = `<b>${emoji} Review: ${project}</b>\nAuthor: ${author}\nStatus: ${result.status}\n\n${result.summary}`;
  
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const params = new URLSearchParams();
  params.append('chat_id', chatId);
  params.append('text', summary);
  params.append('parse_mode', 'HTML');

  await fetch(url, { method: 'POST', body: params });
}

run();