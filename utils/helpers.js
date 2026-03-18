// =============================================================
// utils/helpers.js — Utility / Helper Functions for Todo App Tests
// =============================================================

const BASE_URL = 'https://keval-todo-list.netlify.app';

/**
 * Navigate to the login page.
 * @param {import('@playwright/test').Page} page
 */
async function goToLoginPage(page) {
  await page.goto(`${BASE_URL}/login.html`);
}

/**
 * Perform a login action.
 * @param {import('@playwright/test').Page} page
 * @param {string} username
 * @param {string} password
 */
async function login(page, username, password) {
  await goToLoginPage(page);
  await page.getByPlaceholder('Enter username').fill(username);
  await page.getByPlaceholder('Enter password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

/**
 * Login with valid demo credentials.
 * @param {import('@playwright/test').Page} page
 */
async function loginWithValidCredentials(page) {
  await login(page, 'demo@todo.test', 'Demo@123');
}

/**
 * Add a new task via the Add Task form.
 * @param {import('@playwright/test').Page} page
 * @param {{ title: string, description?: string, dueDate: string, status?: string }} taskData
 */
async function addTask(page, { title, description = '', dueDate, status = 'TODO' }) {
  // Fill Title
  const titleInput = page.locator('aside').locator('input[type="text"]').first();
  await titleInput.fill(title);

  // Fill Description (optional)
  if (description) {
    const descTextarea = page.locator('aside textarea').first();
    await descTextarea.fill(description);
  }

  // Fill Due Date
  const dueDateInput = page.locator('aside').locator('input[type="datetime-local"]').first();
  await dueDateInput.fill(dueDate);

  // Select Status
  const statusSelect = page.locator('aside select').first();
  await statusSelect.selectOption(status);

  // Click Add Task
  await page.getByRole('button', { name: 'Add Task' }).click();
}

/**
 * Get a future datetime string suitable for datetime-local inputs.
 * @param {number} daysAhead - Number of days from today
 * @returns {string} e.g. "2026-04-01T10:00"
 */
function getFutureDate(daysAhead = 7) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(10, 0, 0, 0);
  return d.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
}

module.exports = {
  goToLoginPage,
  login,
  loginWithValidCredentials,
  addTask,
  getFutureDate,
  BASE_URL,
};
