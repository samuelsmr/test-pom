const { By, until } = require("selenium-webdriver");
const testData = require("../testdata.json");

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
  }

  async enterCheckoutInfo(firstName, lastName, postalCode) {
    await this.driver.findElement(By.id("first-name")).sendKeys(firstName);
    await this.driver.findElement(By.id("last-name")).sendKeys(lastName);
    await this.driver.findElement(By.id("postal-code")).sendKeys(postalCode);
    await this.driver.findElement(By.id("continue"));
  }

  async proceedToOverview() {
    await this.driver.findElement(By.id("continue")).click();
    await this.driver.wait(until.urlContains("checkout-step-two.html"), 5000);
  }

  async finishCheckout() {
    await this.driver.findElement(By.id("finish")).click();
    await this.driver.wait(until.urlContains("checkout-complete.html"), 5000);
  }

  async getConfirmationMessage() {
    return await this.driver.findElement(By.css(".complete-header")).getText();
  }

  async validateCheckoutSuccess() {
    let successMessage = await this.getConfirmationMessage();
    return successMessage === testData.messages.checkoutSuccess;
  }
}

module.exports = CheckoutPage;
