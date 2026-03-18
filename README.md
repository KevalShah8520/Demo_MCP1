# Demo_MCP1 — Playwright Automation Suite

> End-to-end automated test suite for [keval-todo-list.netlify.app](https://keval-todo-list.netlify.app/login.html)
> Built with Playwright (JavaScript) following real-world QA best practices.

---

## 📁 Project Structure

```
Demo_MCP1/
├── tests/
│   ├── login.spec.js       # TC_001–TC_005: Login module tests
│   └── addTask.spec.js     # TC_006–TC_010: Add Task module tests
├── utils/
│   └── helpers.js          # Reusable helper functions
├── playwright.config.js    # Playwright configuration
├── package.json            # Project dependencies & scripts
└── README.md
```

---

## 🧪 Test Coverage

### Login Module (TC_001 – TC_005)
| TC_ID  | Description                               |
|--------|-------------------------------------------|
| TC_001 | Valid credentials → redirect to Todo page |
| TC_002 | Invalid username → stays on login page    |
| TC_003 | Invalid password → stays on login page    |
| TC_004 | Empty credentials → validation error      |
| TC_005 | Clear button resets the form              |

### Add Task Module (TC_006 – TC_010)
| TC_ID  | Description                                  |
|--------|----------------------------------------------|
| TC_006 | Add task with all valid fields               |
| TC_007 | Add task without Title → validation error    |
| TC_008 | Add task without Due Date → validation error |
| TC_009 | Add task with "In Progress" status           |
| TC_010 | Reset button clears all form fields          |

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm v7 or higher

---

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/KevalShah8520/Demo_MCP1.git
cd Demo_MCP1
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npx playwright install
```

---

## ▶️ Execution Steps

### Run all tests (headless)
```bash
npm test
```

### Run all tests with browser UI visible
```bash
npm run test:headed
```

### Run only Login tests
```bash
npm run test:login
```

### Run only Add Task tests
```bash
npm run test:addtask
```

### Open HTML test report
```bash
npm run report
```

---

## 🔐 App Credentials

| Field    | Value                                                  |
|----------|--------------------------------------------------------|
| URL      | https://keval-todo-list.netlify.app/login.html         |
| Username | demo@todo.test                                         |
| Password | Demo@123                                               |

---

## 📊 Test Results (Latest Run — 18 Mar 2026)

| TC_ID  | Module   | Status  | Comments                                          |
|--------|----------|---------|---------------------------------------------------|
| TC_001 | Login    | ✅ Pass | Redirected to index.html; heading visible         |
| TC_002 | Login    | ✅ Pass | Stayed on login.html with invalid username        |
| TC_003 | Login    | ✅ Pass | Stayed on login.html with invalid password        |
| TC_004 | Login    | ✅ Pass | HTML5 required validation fires on empty submit   |
| TC_005 | Login    | ✅ Pass | Both fields cleared after Clear click             |
| TC_006 | Add Task | ✅ Pass | Task appeared in list with all correct details    |
| TC_007 | Add Task | ✅ Pass | Required validation prevents submission           |
| TC_008 | Add Task | ✅ Pass | Required validation on Due Date fires correctly   |
| TC_009 | Add Task | ✅ Pass | Task saved with "In Progress" status label        |
| TC_010 | Add Task | ✅ Pass | All form fields cleared after Reset click         |

**Total: 10/10 Passed ✅ | 0 Failed**

---

## 🛠️ Tech Stack

- **Language:** JavaScript (Node.js)
- **Framework:** [Playwright](https://playwright.dev/)
- **Test Runner:** Playwright Test (`@playwright/test`)
- **Browsers:** Chromium (configurable)

---

## 📝 Notes

- Tests are modular and use shared helper functions from `utils/helpers.js`
- Each test is independent; `beforeEach` handles login for Add Task tests
- Screenshots captured on failure automatically
- HTML report generated at `playwright-report/index.html`
- Google Sheet test results: [View Sheet](https://docs.google.com/spreadsheets/d/1eMrLEnUlbPhS7D7-cayoFTD3txCaTv44CzWkN5yMZSk)
