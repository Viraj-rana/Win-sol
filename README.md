# WinSolution AI - Automated Code Review MVP

![WinsolutionAI dashboard automatic/manual](images/img1.png)

WinSolution AI is an intelligent "Automated Job" simulator that provides deep-dive architectural code reviews. Unlike standard linters, it uses advanced AI to analyze code against your custom engineering principles, verifying intent, logical consistency, and security risks.

WinSolution AI — это интеллектуальный симулятор «автоматизированных заданий», обеспечивающий углубленный анализ архитектуры кода. В отличие от стандартных линтеров, он использует передовые технологии искусственного интеллекта для анализа кода на соответствие вашим собственным инженерным принципам, проверяя намерения, логическую согласованность и риски безопасности.

![app interface configuration with github and gitlab](images/img2.png)

**Important Usage Guideline**  
This application is **exclusively for WinSolution Engineering team members**. Unauthorized access or use by external parties is strictly prohibited.
Данное приложение предназначено **исключительно для членов инженерной команды WinSolution**. Несанкционированный доступ или использование третьими лицами строго запрещены.

##  How to Run Locally

### Prerequisites
- **Node.js**: Version 18.x or higher.
- **API Key**: A compatible AI API key.
-**CLOUD INTEGRATED**: Backend Cloud integrate.

### Installation Steps
1. **Extract/Clone** the project files into a directory.
2. **Install Dependencies**:
   ```bash
   npm install
   npm run dev
   npm install lucide-react

   ### Gitlab or Github Integration

**how the flow executes**
  1. The Trigger GitLab CI

  When you push code to a Merge Request, GitLab will automatically detect the **.gitlab-ci.yml** file.
  Action: It spins up a node:20 container.
  Logic: It identifies that this is a merge_request_event.
  Diff Generation: It executes the specific git commands defined in the YAML file to fetch the target branch and compare it to your changes, saving the    output to pr_diff.txt.

  2. The Brain (The Script)

  The **scripts/ci-review.js** runs immediately after the diff is generated.
  Detection: It detects the GITLAB_CI environment variable.
  Metadata: It successfully grabs the author (GITLAB_USER_LOGIN), the title (CI_MERGE_REQUEST_TITLE), and the ID.
  Analysis: It reads the pr_diff.txt file and sends it to Gemini.

  3. The Output (The Integration)

  Pass/Fail: If Gemini finds CRITICAL issues, the script exits with code 1, which tells GitLab to mark the pipeline as Failed, preventing the merge (if you have that setting enabled in GitLab).
  Reporting: It successfully pushes the data to Supabase (so your dashboard updates) and sends the Telegram alert.
  The Only "Manual" Step Remaining
  For this to work "100%", you must perform one configuration step in GitLab:

  1- Go to Settings > CI/CD > Variables.
  2- Add the following variables (Key / Value):

  **These are already setup please no need to change**

  GEMINI_API_KEY **use your api key or commercial
  SUPABASE_URL
  SUPABASE_KEY
  TELEGRAM_BOT_TOKEN
  TELEGRAM_CHAT_ID
   As long as those variables exist, the code provided is fully functional for an automated GitLab workflow.
   lightbulb_tips 

   ### Mathematical computation Algorithms
   **"Circuit Breaker" Algorithm**
    **Token Bucket (Rate Limiting)**
    **Data Binding**
    **Deep Searching**

### How many people can use this at once?
- **Infinite Users**: Because this is a client-side application, works on cloud, the UI can be served to thousands of users simultaneously via any static host (Vercel, Netlify, GitHub Pages or main Cloud Server).
- **The Bottleneck (API Rate Limits)**: 
  - If using the **Free Tier** API key: Google limits you to approximately 15 requests per minute. Multiple users hitting "Run Review" at once may trigger a "429 Rate Limit Exceeded" error Algorithm has been used so it will refill when its not working.
  - If using a **Paid Tier** API key: The capacity increases significantly to thousands of requests per minute, easily supporting hundreds of concurrent users.

## 🏗️ Architectural Features
- **Pipeline Runner Console**: Simulates a CI/CD job environment (GitLab/GitHub style) with real-time logging.
- **Intent Verification**: Analyzes GitLab MR/GitHub PR metadata to ensure the code changes actually match the developer's stated goal.
- **Repo Analyst Mode**: Maps the "DNA" of an entire repository, identifying tech stacks and generating READMEs.
- **Custom Style Guides**: Allows engineers to enforce team-specific logic patterns that standard linters miss.

---
*Created by the WinSolution Engineering Team.*
