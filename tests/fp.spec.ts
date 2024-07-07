import { test, expect } from '@playwright/test';
import { invalidForgottenPasswordSubmission } from './support/utility';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await handleCookieDisclaimer(page)
});

test('Should trigger error message for non existant account during forgotten password submission', async ({ page }) => {
    await page.locator("[data-testid='loginButton']").click()
    await page.locator('text=Forgot password?').click()
    await invalidForgottenPasswordSubmission(page) // Cypress Command like implementation
    await expect(page.locator('text=Incorrect. Please try again.')).toBeVisible()
});
