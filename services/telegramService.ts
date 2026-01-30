import { ReviewResult, Severity } from "../types";

export const sendReviewToTelegram = async (
  botToken: string,
  chatId: string,
  author: string,
  projectName: string,
  result: ReviewResult
) => {
  if (!botToken || !chatId) return;

  const criticals = result.issues.filter(i => i.severity === Severity.CRITICAL).length;
  const warnings = result.issues.filter(i => i.severity === Severity.WARNING).length;
  const infos = result.issues.filter(i => i.severity === Severity.INFO).length;

  const emojiStatus = result.status === 'APPROVE' ? '✅' : '❌';
  
  // Helper to escape HTML characters for Telegram's HTML parse mode
  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Build the initial summary header
  const headerText = `<b>${emojiStatus} Code Review Result: ${projectName}</b>\n\n` +
    `<b>Author:</b> ${escapeHtml(author)}\n` +
    `<b>Status:</b> ${result.status}\n\n` +
    `<b>Summary:</b>\n<i>${escapeHtml(result.summary)}</i>\n\n` +
    `<b>Metrics:</b>\n🚨 Critical: ${criticals} | ⚠️ Warnings: ${warnings} | ℹ️ Info: ${infos}\n\n` +
    `<b>Detailed Issues:</b>\n`;

  // Telegram message limit is 4096 chars. We use 4000 to be safe.
  const MAX_MSG_LENGTH = 4000; 
  const messages: string[] = [];
  
  let currentMessageBuffer = headerText;

  for (let i = 0; i < result.issues.length; i++) {
    const issue = result.issues[i];
    
    // Sanitize content
    const cleanMessage = escapeHtml(issue.message);
    const cleanRule = issue.ruleReference ? escapeHtml(issue.ruleReference) : '';
    // Include code snippet for detail, truncated to 200 chars to keep it readable
    const cleanCode = issue.codeSnippet 
        ? escapeHtml(issue.codeSnippet.length > 200 ? issue.codeSnippet.substring(0, 200) + '...' : issue.codeSnippet) 
        : '';

    let issueBlock = `\n${i + 1}. <b>[${issue.severity}]</b> ${cleanMessage}`;
    
    if (cleanCode) {
        issueBlock += `\n<pre>${cleanCode}</pre>`;
    }
    
    if (cleanRule) {
      issueBlock += `\nRule: <i>${cleanRule}</i>`;
    }
    issueBlock += `\n`;

    // Check if adding this block exceeds the limit
    if (currentMessageBuffer.length + issueBlock.length > MAX_MSG_LENGTH) {
      // Flush current buffer to messages array
      messages.push(currentMessageBuffer);
      
      // Start new buffer with a continuation header
      currentMessageBuffer = `<b>...Continued (Part ${messages.length + 1})</b>\n${issueBlock}`;
    } else {
      currentMessageBuffer += issueBlock;
    }
  }

  // Add the final buffer if it has content
  if (currentMessageBuffer.length > 0) {
    messages.push(currentMessageBuffer);
  }

  // Function to send a single message chunk
  const sendMessage = async (text: string, isLast: boolean) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const params = new URLSearchParams();
    params.append('chat_id', chatId);
    params.append('text', text);
    params.append('parse_mode', 'HTML');

    // Only add interactive buttons to the very last message
    if (isLast) {
      const reply_markup = JSON.stringify({
        inline_keyboard: [
          [
            { text: "✅ Approve", callback_data: "approve_review" },
            { text: "❌ Decline", callback_data: "decline_review" }
          ]
        ]
      });
      params.append('reply_markup', reply_markup);
    }

    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });
  };

  // Send all messages sequentially
  try {
    for (let i = 0; i < messages.length; i++) {
      await sendMessage(messages[i], i === messages.length - 1);
      // Add a small delay between messages to ensure order and respect loose rate limits
      if (i < messages.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    console.log(`Sent ${messages.length} Telegram notification chunks.`);
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
  }
};