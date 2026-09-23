<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FF6B6B,50:2EAD33,100:3178C6&height=180&section=header&text=Playwright%20AI%20Agents%20🤖&fontSize=36&fontColor=ffffff&animation=fadeIn&fontAlignY=38"/>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&pause=1000&color=2EAD33&center=true&vCenter=true&width=650&lines=Self-Healing+Tests%2C+Written+by+Agents+%F0%9F%A4%96;Plan+%E2%86%92+Generate+%E2%86%92+Run+%E2%86%92+Heal+%E2%9A%A1;Powered+by+the+Playwright+MCP+Server+%F0%9F%94%8C" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MCP_Server-FF6B6B?style=for-the-badge&logo=robotframework&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub_Copilot-000000?style=for-the-badge&logo=githubcopilot&logoColor=white" />
</p>

---

### 📋 Overview

Instead of writing every test by hand, this project sets up an AI coding agent (GitHub Copilot / Claude in VS Code) to:

| Step | Agent | Does |
|---|---|---|
| 1️⃣ | **Planner** | Explores the target app in a real browser and writes a structured test plan |
| 2️⃣ | **Generator** | Turns a plan item + seed file into an executable Playwright spec |
| 3️⃣ | **Healer** | Runs the suite, debugs failures (console/network/locators), and patches tests until green |

All three connect to one local **Playwright MCP server**, which exposes browser and test-runner actions as tools an agent can call. The repo includes a full working example of this loop against the **OrangeHRM demo site**.

---

### 🔄 How the Agent Loop Works

```mermaid
flowchart LR
    A["🧭 Planner Agent"] -->|"writes"| B["📄 Test Plan (.md)"]
    B -->|"read by"| C["⚙️ Generator Agent"]
    C -->|"writes"| D["🧪 Spec File (.spec.ts)"]
    D -->|"executed by"| E["🩹 Healer Agent"]
    E -->|"fails? debug & patch"| D
    E -->|"passes ✅"| F["🟢 Green Test Suite"]

    M[("🔌 Playwright MCP Server")]
    A -.->|"browser_navigate, browser_snapshot"| M
    E -.->|"test_run, test_debug, browser_click"| M
    M -.-> A
    M -.-> E
```

Every agent talks to the same MCP server (`npx playwright run-test-mcp-server`), which exposes actions like `browser_click`, `browser_navigate`, `browser_snapshot`, `test_run`, `test_debug`, and `test_list` as callable tools — that's the piece that lets an LLM actually *drive* a browser and a test runner instead of just generating text.

---

### 🧰 Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=ts,playwright,nodejs,vscode,github&theme=dark" />
</p>

- 🎭 **[Playwright](https://playwright.dev/)** — end-to-end browser testing framework
- 🔷 **TypeScript** — test scripting language
- 🔌 **Playwright MCP Server** — exposes browser + test-runner actions as agent tools
- 🤖 **GitHub Copilot Agents** — custom `.agent.md` definitions for planner/generator/healer
- 🟩 **Node.js** — runtime environment

---

### 📁 Project Structure

```
Playwright-AI-Agents-Project
├── .github/
│   ├── agents/
│   │   ├── playwright-test-planner.agent.md    # Explores a site and writes a test plan
│   │   ├── playwright-test-generator.agent.md  # Turns a test plan item into a .spec.ts file
│   │   └── playwright-test-healer.agent.md     # Runs tests, debugs failures, fixes them
│   └── workflows/
│       └── copilot-setup-steps.yml             # CI setup steps for Copilot agent environment
├── .vscode/
│   └── mcp.json                                # VS Code MCP server config (playwright-test)
├── specs/
│   ├── README.md
│   ├── orangehrm-dashboard-test-plan.md         # AI-generated test plan for OrangeHRM dashboard
│   └── orangehrm-dashboard.spec.ts              # Generated test implementing the plan
├── tests/
│   ├── sample-agent-test.spec.ts               # Basic smoke test (example.com)
│   └── sample.test.spec.ts                     # Legacy expense-tracker test (add/delete expense)
├── seed.spec.ts                                # Empty seed used as starting point for agents
├── playwright.config.ts
├── package.json
└── package-lock.json
```

---

### ✅ Included Test Coverage

| File | Description |
|---|---|
| `specs/orangehrm-dashboard.spec.ts` | 🏢 Logs into the [OrangeHRM demo site](https://opensource-demo.orangehrmlive.com/), verifies dashboard loads with correct nav/widgets/profile area, checks invalid-login error |
| `tests/sample-agent-test.spec.ts` | 💨 Smoke test that `example.com` loads with expected title & heading |
| `tests/sample.test.spec.ts` | 💰 Legacy test — signs into an Expense Tracker app, creates/deletes an expense |
| `seed.spec.ts` | 🌱 Empty placeholder used as a seed for the generator agent |

---

### ⚙️ Configuration Highlights

<details>
<summary><b>playwright.config.ts settings (click to expand)</b></summary>
<br>

| Setting | Value |
|---|---|
| Test directory | `./tests` |
| Browser | Chrome (channel: `chrome`) |
| Headless mode | ❌ Disabled — visible browser |
| Slow motion | 1000ms delay between actions |
| Global timeout | 60 minutes |
| Per-test timeout | 2 minutes |
| Assertion timeout | 10s |
| Trace / Screenshot / Video | ✅ All enabled on every run |
| Reporter | HTML (`playwright-report/`) + console list |

</details>

---

### 🚀 Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) (LTS) · npm · VS Code + GitHub Copilot *(optional — only needed to run the agents, not the existing tests)*

```bash
# 1. Clone the repository
git clone https://github.com/vamsimappetti2001/Playwright-AI-Agents-Project.git
cd Playwright-AI-Agents-Project

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

### ▶️ Running Tests

```bash
npm test
# or
npx playwright test

# Run a specific spec
npx playwright test specs/orangehrm-dashboard.spec.ts

# View the HTML report
npx playwright show-report
```

### 🤖 Using the AI Agents (VS Code / GitHub Copilot)

1. Open the project in VS Code with GitHub Copilot enabled
2. The `playwright-test` MCP server is already configured in `.vscode/mcp.json`
3. Invoke the **planner**, **generator**, or **healer** agent (under `.github/agents/`) from Copilot Chat to plan new tests, generate specs from a plan, or auto-fix failing tests

---

### 🔐 Security Note — Action Required Before This Repo Is Public-Facing

> ⚠️ `tests/sample.test.spec.ts` contains a **hardcoded real email and password** for an external site.

Before linking this repo to any job application:
- [ ] Remove or replace this legacy test, or move credentials to environment variables loaded via `dotenv`
- [ ] Rotate the exposed password on the target account
- [ ] Add a `.gitignore` (currently missing) to exclude `node_modules/`, `test-results/`, `playwright-report/`, and `.playwright-mcp/` logs, which are currently committed

---

### 🧪 Why This Repo Matters for a QA Role

This isn't just "I used Copilot to write tests" — it's a working answer to a question most QA teams are only starting to ask: *where do AI agents actually fit into a test lifecycle?*

- 🧭 **Planning is externalized and reviewable** — the planner writes a Markdown test plan *before* any code exists, so a human can review test intent, not just test code
- 🩹 **Healing is debugging, not guessing** — the healer inspects real console/network/locator state before patching, the same workflow a human would follow
- 🔌 **Built on an open protocol (MCP)**, not a closed tool — the same pattern generalizes to any agent, any framework
- 🔍 **Security-aware, not just feature-aware** — I found and documented the credential issue above myself, which is the instinct I'd bring to reviewing anyone's test suite, AI-generated or not

---

### 👤 Author

**Vamsi Mappetti** · QA / Test Automation Engineer
📍 Bengaluru, India &nbsp;|&nbsp; 🔗 [@vamsimappetti2001](https://github.com/vamsimappetti2001)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3178C6,50:2EAD33,100:FF6B6B&height=100&section=footer"/>
