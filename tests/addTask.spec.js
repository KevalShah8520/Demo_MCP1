// =============================================================
// tests/addTask.spec.js — Add Task Module Test Cases (TC_006–TC_010)
// Application: https://keval-todo-list.netlify.app/index.html
// Pre-req: User must be logged in before each test
// =============================================================

const { test, expect } = require('@playwright/test');
const { loginWithValidCredentials, addTask, getFutureDate } = require('../utils/helpers');

test.describe('Add Task Module', () => {

  // Login with valid credentials before each test
  test.beforeEach(async ({ page }) => {
    await loginWithValidCredentials(page);
    await expect(page).toHaveURL(/index\.html/);
    // Ensure the Add Task form is present
    await expect(page.getByRole('heading', { name: 'New Task' })).toBeVisible();
  });

  // ─────────────────────────────────────────────────────────
  // TC_006: Add task with all valid fields
  // ─────────────────────────────────────────────────────────
  test('TC_006: Add task with all valid fields appears in task list', async ({ page }) => {
    const taskTitle = `Automation Task ${Date.now()}`;

    await addTask(page, {
      title: taskTitle,
      description: 'Created by Playwright automation',
      dueDate: getFutureDate(7),
      status: 'TODO',
    });

    // Assert task appears in the list
    await expect(page.getByRole('heading', { name: taskTitle, level: 4 })).toBeVisible();
  });

  // ─────────────────────────────────────────────────────────
  // TC_007: Add task without Title (required field)
  // ─────────────────────────────────────────────────────────
  test('TC_007: Add task without Title shows required validation error', async ({ page }) => {
    // Fill Due Date only, leave Title empty
    const dueDateInput = page.locator('aside').locator('input[type="datetime-local"]').first();
    await dueDateInput.fill(getFutureDate(5));

    // Click Add Task
    await page.getByRole('button', { name: 'Add Task' }).click();

    // Title field should fail required validation
    const titleInput = page.locator('aside').locator('input[type="text"]').first();
    const isValid = await titleInput.evaluate(el => el.validity.valid);
    expect(isValid).toBeFalsy();

    // Page should not navigate away
    await expect(page).toHaveURL(/index\.html/);
  });

  // ─────────────────────────────────────────────────────────
  // TC_008: Add task without Due Date (required field)
  // ─────────────────────────────────────────────────────────
  test('TC_008: Add task without Due Date shows required validation error', async ({ page }) => {
    // Fill Title only, leave Due Date empty
    const titleInput = page.locator('aside').locator('input[type="text"]').first();
    await titleInput.fill('Task Without Due Date');

    // Click Add Task
    await page.getByRole('button', { name: 'Add Task' }).click();

    // Due Date field should fail required validation
    const dueDateInput = page.locator('aside').locator('input[type="datetime-local"]').first();
    const isValid = await dueDateInput.evaluate(el => el.validity.valid);
    expect(isValid).toBeFalsy();

    // Page should not navigate away
    await expect(page).toHaveURL(/index\.html/);
  });

  // ─────────────────────────────────────────────────────────
  // TC_009: Add task with Status "In Progress"
  // ─────────────────────────────────────────────────────────
  test('TC_009: Add task with "In Progress" status is saved and displayed correctly', async ({ page }) => {
    const taskTitle = `InProgress Task ${Date.now()}`;

    await addTask(page, {
      title: taskTitle,
      dueDate: getFutureDate(3),
      status: 'In Progress',
    });

    // Assert task appears in the list
    await expect(page.getByRole('heading', { name: taskTitle, level: 4 })).toBeVisible();

    // Assert status label shows "In Progress"
    const taskEntry = page.locator('text=' + taskTitle).locator('../..');
    await expect(taskEntry).toContainText('In Progress');
  });

  // ─────────────────────────────────────────────────────────
  // TC_010: Reset button clears the Add Task form
  // ─────────────────────────────────────────────────────────
  test('TC_010: Reset button clears all fields in Add Task form', async ({ page }) => {
    // Fill in all fields
    const titleInput = page.locator('aside').locator('input[type="text"]').first();
    const descTextarea = page.locator('aside textarea').first();
    const dueDateInput = page.locator('aside').locator('input[type="datetime-local"]').first();

    await titleInput.fill('Sample Task Title');
    await descTextarea.fill('Sample description text');
    await dueDateInput.fill(getFutureDate(2));

    // Click Reset
    await page.getByRole('button', { name: 'Reset' }).click();

    // Assert all fields are cleared
    await expect(titleInput).toHaveValue('');
    await expect(descTextarea).toHaveValue('');
    await expect(dueDateInput).toHaveValue('');
  });

});
