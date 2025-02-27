const { By, until } = require("selenium-webdriver");

class CartPage {
  constructor(driver) {
    this.driver = driver;
  }

  async openCart() {
    await this.driver.findElement(By.className("shopping_cart_link")).click();
    await this.driver.wait(until.urlContains("cart.html"), 5000);
  }

  async getCartItemCount() {
    try {
      let cartBadge = await this.driver.findElement(By.className("shopping_cart_badge"));
      return await cartBadge.getText();
    } catch (error) {
      return "0"; // Jika tidak ada item di cart
    }
  }

  async proceedToCheckout() {
    await this.driver.findElement(By.id("checkout")).click();
    await this.driver.wait(until.urlContains("checkout-step-one.html"), 5000);
  }
}

module.exports = CartPage;