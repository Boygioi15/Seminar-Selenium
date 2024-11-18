const xlsx = require("xlsx");
const { Builder, By, Key } = require("selenium-webdriver");

async function runTests() {
  // Load the Excel file
  const workbook = xlsx.readFile("testcases.xlsx");
  const sheet = workbook.Sheets["Sheet1"];
  const data = xlsx.utils.sheet_to_json(sheet); // Read all data as an array of objects

  //Init the browser
  const driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:5173");

  //locate the element
  const nameInput = await driver.findElement(By.id("nameInput"));
  const emailInput = await driver.findElement(By.id("emailInput"));
  const ageInput = await driver.findElement(By.id("ageInput"));
  const submitButton = await driver.findElement(
    By.css("button[type='submit']")
  );
  const validationMessage = await driver.findElement(
    By.id("validationMessage")
  );

  try {
    //loop through each row
    for (let i = 0; i < data.length; i++) {
      const dataRow = data[i]; //{Name, Email, Age}
      let result = "F"; // Default to Fail (F)

      try {
        //Reset fields
        await nameInput.sendKeys(Key.CONTROL, "a", Key.DELETE);
        await driver.sleep(100);
        await emailInput.sendKeys(Key.CONTROL, "a", Key.DELETE);
        await driver.sleep(100);
        await ageInput.sendKeys(Key.CONTROL, "a", Key.DELETE);
        await driver.sleep(300);

        // Input data from Excel
        await nameInput.sendKeys(dataRow.Name);
        await driver.sleep(100);
        await emailInput.sendKeys(dataRow.Email);
        await driver.sleep(100);
        await ageInput.sendKeys(String(dataRow.Age));
        await driver.sleep(100);
        await submitButton.click();
        await driver.sleep(300);

        //check result
        const messageText = await validationMessage.getText();
        console.log(messageText);

        if (messageText === "") {
          result = "P"; // Pass
        }
      } catch (error) {
        console.error(`Test case ${i} failed( technically):`, error);
      } finally {
        // Write result to the Excel file in column E
        const cellPos = xlsx.utils.encode_cell({ r: i + 1, c: 3 });
        //console.log("Write " + result + " of test case " + i + " into excel");

        // Specify both the value and type of the cell
        sheet[cellPos] = { v: result };
      }

      // Pause briefly before the next test case
      await driver.sleep(1000);
    }

    // Save updated Excel file with results
  } finally {
    await xlsx.writeFile(workbook, "testcases.xlsx");
    await driver.quit();
  }
}

runTests().catch(console.error);
