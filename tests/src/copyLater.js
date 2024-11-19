const { Builder, By } = require("selenium-webdriver");

(async function testFormValidation() {
  //config browser with chrome.
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    //point to the url: http://localhost:5173
    await driver.get("http://localhost:5173");

    await driver.findElement(By.id("nameInput")).sendKeys("Hello World");
    await driver.sleep(1000);
    await driver.findElement(By.id("ageInput")).sendKeys("49");
    await driver.sleep(1000);
    await driver.findElement(By.css("button[type='submit']")).click();

    // Verify validation message
    let validationText = await driver
      .findElement(By.id("validationMessage"))
      .getText();
    if (validationText === "") {
      console.log("Test 1 Passed");
    } else {
      console.log("Test 1 Failed. Message: ${validationText}");
    }

    // Clear inputs before next test
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.sleep(2000);
    await driver.quit();
  }
})();
/*
// Test 2: Valid submission
await driver.findElement(By.id("nameInput")).sendKeys("Jo");
await driver.findElement(By.id("emailInput")).sendKeys("test@example.com");
await driver.findElement(By.id("ageInput")).sendKeys("25");
await driver.findElement(By.css("button[type='submit']")).click();

// Check for success message
validationText = await driver.findElement(By.id("validationMessage")).getText();
if (validationText === "") {
  console.log("Test 2 Passed");
} else {
  console.log("Test 2 Failed. Message: ${validationText}");
}
*/
