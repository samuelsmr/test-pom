const { Builder } = require("selenium-webdriver");
const fs = require("fs");
const testData = require("./testdata.json");
const PageObjectManager = require("./pom");

async function takeScreenshot(driver, step) {
  let image = await driver.takeScreenshot();
  fs.writeFileSync(`screenshots/${step}.png`, image, "base64");
}

async function saucedemoTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  let pom = new PageObjectManager(driver);

  try {
    console.log("🚀 Memulai test...");

    // 1️⃣ Buka halaman login dan login
    await pom.getLoginPage().open();
    await takeScreenshot(driver, "01_login_page");
    await pom.getLoginPage().login(testData.validUser.username, testData.validUser.password);
    await takeScreenshot(driver, "02_after_login");
    console.log("✅ User berhasil login.");

    // 2️⃣ Validasi berada di dashboard
    if (!(await pom.getInventoryPage().isAtInventoryPage())) {
      throw new Error("❌ User tidak berada di dashboard!");
    }
    await takeScreenshot(driver, "03_dashboard");
    console.log("✅ User berada di dashboard setelah login.");

    // 3️⃣ Tambah item pertama ke cart
    await pom.getInventoryPage().addFirstItemToCart();
    await takeScreenshot(driver, "04_item_added_to_cart");
    console.log("✅ Item pertama ditambahkan ke cart.");

    // 4️⃣ Buka cart dan validasi item ada di cart
    await pom.getCartPage().openCart();
    let cartCount = await pom.getCartPage().getCartItemCount();
    if (cartCount !== "1") {
      throw new Error("❌ Item tidak ditambahkan ke cart!");
    }
    await takeScreenshot(driver, "05_cart_page");
    console.log("✅ Item sukses ditambahkan ke cart.");

    // 5️⃣ Checkout
    await pom.getCartPage().proceedToCheckout();
    await takeScreenshot(driver, "06_checkout_info");
    await pom.getCheckoutPage().enterCheckoutInfo(
      testData.checkoutInfo.firstName,
      testData.checkoutInfo.lastName,
      testData.checkoutInfo.postalCode
    );
    await pom.getCheckoutPage().proceedToOverview();
    await takeScreenshot(driver, "07_checkout_overview");
    await pom.getCheckoutPage().finishCheckout();
    await takeScreenshot(driver, "08_checkout_complete");

    // 6️⃣ Validasi checkout sukses
    if (!(await pom.getCheckoutPage().validateCheckoutSuccess())) {
      throw new Error("❌ Checkout gagal!");
    }
    console.log("✅ Checkout berhasil! Pesanan selesai.");

  } catch (error) {
    console.error("❌ Test gagal:", error);
  } finally {
    await driver.wait(1000);
    console.log("🔄 Browser ditutup.");
  }
}

// Jalankan test
saucedemoTest();
