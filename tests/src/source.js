const { Builder, By } = require("selenium-webdriver");

async function test() {
  const driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:5173");
}
test();
