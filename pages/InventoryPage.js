const { By, until } = require("selenium-webdriver");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
  }

  async isAtInventoryPage() {
    let currentUrl = await this.driver.getCurrentUrl();
    return currentUrl.includes("inventory.html");
  }

  async addFirstItemToCart() {
    let firstItem = await this.driver.findElement(By.css(".inventory_item button"));
    await firstItem.click();
  }
}

module.exports = InventoryPage;
