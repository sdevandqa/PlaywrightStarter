import { test, expect, Page } from '@playwright/test';

export async function invalidForgottenPasswordSubmission(page: Page) {
    await page.locator('[name="username"]').fill("fakeemail4@email.com")
    await page.locator('text=Next').click()
    await page.locator('[data-testid="ocfEnterTextTextInput"]').fill('banana193040393')
    await page.locator('text=Next').click()
}

export async function handleCookieDisclaimer(page: Page) {
    await page.locator('text=Accept all cookies').click()
    await page.locator("[data-testid='xMigrationBottomBar']").click()
}
