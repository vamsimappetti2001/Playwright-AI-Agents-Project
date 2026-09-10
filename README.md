# Playwright AI Agents Project

A Playwright + TypeScript test automation project that uses **GitHub Copilot's Playwright test agents** (planner, generator, and healer) to plan, generate, run, and self-heal end-to-end browser tests via the Playwright MCP (Model Context Protocol) server.

## 📋 Overview

Instead of writing every test by hand, this project is set up so an AI coding agent (GitHub Copilot / Claude in VS Code) can:

1. **Plan** test scenarios for a target web app
2. **Generate** Playwright test files from that plan
3. **Run and heal** failing tests automatically by inspecting the browser, console, and network state

The repo currently includes a working example of this workflow for the **OrangeHRM demo site**, plus a couple of standalone sample/legacy tests.

## 🛠️ Tech Stack

- **[Playwright](https://playwright.dev/)** – End-to-end browser testing framework
- **TypeScript** – Test scripting language
- **Playwright MCP Server** (`playwright run-test-mcp-server`) – Exposes browser and test-runner actions as tools for AI agents
- **GitHub Copilot Agents** – Custom agent definitions for planning, generating, and healing tests
- **Node.js** – Runtime environment

## 📁 Project Structure

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
│   ├── README.md                               # Notes on the specs/ directory
│   ├── orangehrm-dashboard-test-plan.md         # AI-generated test plan for OrangeHRM dashboard
│   └── orangehrm-dashboard.spec.ts              # Generated test implementing the plan
├── tests/
│   ├── sample-agent-test.spec.ts               # Basic smoke test (example.com)
│   └── sample.test.spec.ts                     # Legacy expense-tracker test (add/delete expense)
├── seed.spec.ts                                # Empty seed file used as a starting point for the planner/generator agents
├── playwright.config.ts                        # Playwright configuration
├── package.json
└── package-lock.json
```

## 🤖 How the Agent Workflow Works

1. **Planner agent** (`playwright-test-planner`) navigates the target application in a real browser, explores its flows, and writes a structured Markdown test plan into `specs/` (see `orangehrm-dashboard-test-plan.md` for an example).
2. **Generator agent** (`playwright-test-generator`) reads a test plan item and a seed file (`seed.spec.ts`), then writes an executable Playwright spec (see `specs/orangehrm-dashboard.spec.ts`).
3. **Healer agent** (`playwright-test-healer`) runs the full suite, and for any failing test, debugs it step-by-step (console messages, network requests, locators) and patches the test until it passes.

All three agents connect to the same local **Playwright MCP server** (`npx playwright run-test-mcp-server`), which exposes browser actions (`browser_click`, `browser_navigate`, `browser_snapshot`, etc.) and test-runner actions (`test_run`, `test_debug`, `test_list`) as callable tools.

## ✅ Included Test Coverage

| File | Description |
|---|---|
| `specs/orangehrm-dashboard.spec.ts` | Logs into the [OrangeHRM demo site](https://opensource-demo.orangehrmlive.com/) and verifies the dashboard loads with the correct navigation, widgets, and profile area; also checks the invalid-login error message |
| `tests/sample-agent-test.spec.ts` | Smoke test that `example.com` loads with the expected title and heading |
| `tests/sample.test.spec.ts` | Legacy test that signs into an Expense Tracker app and creates/deletes an expense |
| `seed.spec.ts` | Empty placeholder spec used as a seed/starting point for the generator agent |

## ⚙️ Configuration Highlights

Defined in `playwright.config.ts`:

- **Test directory:** `./tests`
- **Browser:** Chrome (channel: `chrome`)
- **Headless mode:** Disabled (visible browser)
- **Slow motion:** 1000ms delay between actions
- **Global timeout:** 60 minutes; per-test timeout: 2 minutes; assertion timeout: 10s
- **Trace / Screenshot / Video:** All enabled on every run
- **Reporter:** HTML report (`playwright-report/`) + list reporter in the console

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- VS Code with GitHub Copilot (to use the agent workflow) — optional if you only want to run existing tests

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/vamsimappetti2001/Playwright-AI-Agents-Project.git
   cd Playwright-AI-Agents-Project
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Install Playwright browsers
   ```bash
   npx playwright install
   ```

### Running Tests

Run all tests:
```bash
npm test
```
or
```bash
npx playwright test
```

Run a specific spec:
```bash
npx playwright test specs/orangehrm-dashboard.spec.ts
```

View the HTML report after a run:
```bash
npx playwright show-report
```

### Using the AI Agents (VS Code / GitHub Copilot)

1. Open the project in VS Code with GitHub Copilot enabled.
2. The `playwright-test` MCP server is already configured in `.vscode/mcp.json`.
3. Invoke the **planner**, **generator**, or **healer** agent (defined under `.github/agents/`) from Copilot Chat to plan new tests, generate specs from a plan, or auto-fix failing tests.

## 🔐 Security Note

`tests/sample.test.spec.ts` contains a hardcoded real email and password for an external site. Before keeping this repository public, consider:

- Removing or replacing this legacy test, or moving credentials to environment variables loaded via `dotenv`
- Rotating the exposed password on the target account
- Adding a `.gitignore` (currently missing) to exclude `node_modules/`, `test-results/`, `playwright-report/`, and `.playwright-mcp/` logs, which are currently committed to the repo

## 👤 Author

**Vamsi Mappetti**
GitHub: [@vamsimappetti2001](https://github.com/vamsimappetti2001)
