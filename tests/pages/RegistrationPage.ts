import { expect, type Locator, type Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly signupButton: Locator;
  readonly signUpNextButton: Locator;
  readonly nameInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly phoneNumberMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupButton = page.locator('[data-testid="signupButton"]')
    this.signUpNextButton = page.locator('[data-testid="ocfSignupNextLink"]')
    this.nameInput = page.locator('[name="name"]')
    this.phoneNumberInput = page.locator('[name="phone_number"]')
    this.phoneNumberMessage = page.locator('text=Please enter a valid phone number')
  }

  async clickSignupButton() {
    await this.signupButton.click()
  }

  async checkSignUpNextButtonIsDisabled() {
    await expect(this.signUpNextButton).toBeDisabled()
  }

  async checkValidPhoneNumberMessageTriggers() {
    await expect(this.phoneNumberMessage).toBeVisible()
  }

  async fillNameAndPhoneNumberInputs(fname: string, pnumber: string) {
    await this.nameInput.fill(fname)
    await this.phoneNumberInput.fill(pnumber)
  }

  async setDateOfBirthDetails() {
    await this.page.locator('select').nth(0).selectOption('August')
    await this.page.locator('select').nth(1).selectOption('4')
    await this.page.locator('select').nth(2).selectOption('1950')
  }

  async fillAndCheckInvalidFormSubmission() {
    await this.clickSignupButton()
    await this.checkSignUpNextButtonIsDisabled()
    await this.fillNameAndPhoneNumberInputs("Billyium", "1234567")
    await this.checkValidPhoneNumberMessageTriggers()
    await this.setDateOfBirthDetails()
    await this.checkSignUpNextButtonIsDisabled()
  }
}
