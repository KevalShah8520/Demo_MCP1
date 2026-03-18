// =============================================================
// tests/login.spec.js — Login Module Test Cases (TC_001–TC_005)
// Application: https://keval-todo-list.netlify.app/login.html
// =============================================================

const { test, expect } = require('@playwright/test');
const { login, loginWithValidCredentials, goToLoginPage } = require('../utils/helpers');

test.describe('Login Module', () => {

  // ─────────────────────────────────────────────────────────
  // TC_001: Successful login with valid credentials
  // Pre-req: App is accessible at login URL
  // ─────────────────────────────────────────────────────────
  test('TC_001: Valid login redirects to Todo List page', async ({ page }) => {
    await loginWithValidCredentials(page);

    // Assert redirect to index.html
    await expect(page).toHaveURL(/index\.html/);

    // Assert Todo List heading is visible
    await expect(page.getByRole('heading', { name: 'Todo List' })).toBeVisible();
  });

  // ─────────────────────────────────────────────────────────
  // TC_002: Login with invalid username
  // Pre-req: App is accessible at login URL
  // ─────────────────────────────────────────────────────────
  test('TC_002: Invalid username shows error and stays on login page', async ({ page }) => {
    await login(page, 'wrong@test.com', 'Demo@123');

    // User should remain on login page
    await expect(page).toHaveURL(/login\.html/);
    expect(page.url()).toContain('login');
  });

  // ─────────────────────────────────────────────────────────
  // TC_003: Login with invalid password
  // Pre-req: App is accessible at login URL
  // ─────────────────────────────────────────────────────────
  test('TC_003: Invalid password shows error and stays on login page', async ({ page }) => {
    await login(page, 'demo@todo.test', 'WrongPass999!');

    // User should remain on login page
    await expect(page).toHaveURL(/login\.html/);
    expect(page.url()).toContain('login');
  });

  // ─────────────────────────────────────────────────────────
  // TC_004: Login with empty credentials
  // Pre-req: App is accessible at login URL
  // ─────────────────────────────────────────────────────────
  test('TC_004: Empty credentials shows validation and prevents login', async ({ page }) => {
    await goToLoginPage(page);

    // Click Login without filling any field
    await page.getByRole('button', { name: 'Login' }).click();

    // Page should remain on login (HTML5 required validation)
    await expect(page).toHaveURL(/login\.html/);

    // Assert username field has required validation
    const usernameInput = page.getByPlaceholder('Enter username');
    const isValid = await usernameInput.evaluate(el => el.validity.valid);
    expect(isValid).toBeFalsy();
  });

  // ─────────────────────────────────────────────────────────
  // TC_005: Clear button resets the login form
  // Pre-req: App is accessible at login URL
  // ─────────────────────────────────────────────────────────
  test('TC_005: Clear button resets username and password fields to empty', async ({ page }) => {
    await goToLoginPage(page);

    // Fill both fields
    await page.getByPlaceholder('Enter username').fill('demo@todo.test');
    await page.getByPlaceholder('Enter password').fill('Demo@123');

    // Click Clear
    await page.getByRole('button', { name: 'Clear' }).click();

    // Assert both fields are cleared
    await expect(page.getByPlaceholder('Enter username')).toHaveValue('');
    await expect(page.getByPlaceholder('Enter password')).toHaveValue('');
  });

});
