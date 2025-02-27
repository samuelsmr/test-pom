const { By, until } = require("selenium-webdriver");
const testData = require("../testdata.json");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = testData.baseUrl;
  }

  async open() {
    await this.driver.get(this.url);
  }

  async login(username, password) {
    await this.driver.findElement(By.id("user-name")).sendKeys(username);
    await this.driver.findElement(By.id("password")).sendKeys(password);
    await this.driver.findElement(By.id("login-button")).click();
  }

  async getErrorMessage() {
    await this.driver.wait(until.elementLocated(By.css(".error-message-container")), 5000);
    return await this.driver.findElement(By.css(".error-message-container")).getText();
  }
}

module.exports = LoginPage;