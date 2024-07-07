import { test, expect } from '@playwright/test';
import { handleCookieDisclaimer } from './support/utility';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await handleCookieDisclaimer(page)
});

test('Should render sign in with Google and Apple buttons', async ({ page }) => {
  await expect(page.locator("[data-testid='google_placeholder_button']")).toBeVisible()
  await expect(page.locator("[data-testid='apple_sign_in_button']")).toBeVisible()
});

test('Should prevent user logging in with invalid credentials', async ({ page }) => {
  await page.locator("[data-testid='loginButton']").click()
  await page.locator('text=Next').click() 
  await expect(page.locator('[data-testid="toast"]')).toBeVisible()
  await page.locator('[name="text"]').fill("myfakeaddress@fakeemail.com")
  await page.locator('text=Next').click()
  await expect(page.locator('text=Sorry, we could not find your account.')).toBeVisible()
});
