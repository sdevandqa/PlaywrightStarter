import { test, expect } from '@playwright/test';
import { handleCookieDisclaimer } from './support/utility';
import { RegistrationPage } from './pages/RegistrationPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await handleCookieDisclaimer(page)
});

// 1 way we can represent this... Partial actions
test('Should prevent user proceeding to step 2 of registration of phone number is invalid.', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.clickSignupButton()
    await registrationPage.checkSignUpNextButtonIsDisabled()
    await registrationPage.fillNameAndPhoneNumberInputs("Billyium", "1234567")
    await registrationPage.checkValidPhoneNumberMessageTriggers()
    await registrationPage.setDateOfBirthDetails()
    await registrationPage.checkSignUpNextButtonIsDisabled()
});


// Another way we can represent this...
test('Should prevent user proceeding to step 2 of registration of phone number is invalid [alt]', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.fillAndCheckInvalidFormSubmission()
});
