const LoginPage = require("./pages/LoginPage");
const InventoryPage = require("./pages/InventoryPage");
const CartPage = require("./pages/CartPage");
const CheckoutPage = require("./pages/CheckoutPage");

class PageObjectManager {
  constructor(driver) {
    this.driver = driver;
    this.loginPage = null;
    this.inventoryPage = null;
    this.cartPage = null;
    this.checkoutPage = null;
  }

  getLoginPage() {
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.driver);
    }
    return this.loginPage;
  }

  getInventoryPage() {
    if (!this.inventoryPage) {
      this.inventoryPage = new InventoryPage(this.driver);
    }
    return this.inventoryPage;
  }

  getCartPage() {
    if (!this.cartPage) {
      this.cartPage = new CartPage(this.driver);
    }
    return this.cartPage;
  }

  getCheckoutPage() {
    if (!this.checkoutPage) {
      this.checkoutPage = new CheckoutPage(this.driver);
    }
    return this.checkoutPage;
  }
}

module.exports = PageObjectManager;