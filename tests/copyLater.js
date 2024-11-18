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
