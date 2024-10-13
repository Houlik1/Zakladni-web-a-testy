// import selenium
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("test zakladnich elementu", function () {
  let driver;
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://127.0.0.1:5500/index.html");
    afterEach(async function () {
      driver.quit();
    });
  });
  it("kontrola nadpisu", async function () {
    const heading = await driver.findElement(By.tagName("h1")).getText();
    assert.strictEqual(heading, "Nadpis");
  });
  it("normalni text", async function () {
    const text = await driver.findElement(By.className("prvni_text")).getText();
    assert.strictEqual(text, "A copak tohle?");
  });
  it("input a button", async function () {
    const input = await driver.findElement(By.id("input"));
    await input.sendKeys("hello");
    const value = await input.getAttribute("value");
    assert.strictEqual("hello", value);
    const button = await driver.findElement(By.className("odeslat")).getText();
    assert.strictEqual(button, "Odeslat");
  });
  it("selects", async function () {
    const select = await driver.findElement(By.id("prvni_select"));
    await select.sendKeys("Volba 2");
    const selectValue = await select.getAttribute("value");
    assert.strictEqual(selectValue, "volba2");
  });
  it("checkbox", async function () {
    const check = await driver.findElement(By.id("prvni"));
    await check.click();
    const isChecked = await check.isSelected();
    assert.strictEqual(isChecked, true);
  });
  it("radios", async function () {
    const radio = await driver.findElement(By.id("radio1"));
    await radio.click();
    const radioChecked = await radio.isSelected();
    assert.strictEqual(radioChecked, true);
    await driver.sleep(1000);
    const radio2 = await driver.findElement(By.id("radio2"));
    await radio2.click();
    const radio2Checked = await radio2.isSelected();
    const radioUnChecked = await radio.isSelected();
    assert.strictEqual(radio2Checked, true);
    assert.strictEqual(radioUnChecked, false);
  });
  it("odkaz", async function () {
    const odkaz = await driver.findElement(By.id("odkaz"));
    await odkaz.click();
    await driver.wait(until.urlIs("https://example.cypress.io/", 5000));
    let aktualniURL = await driver.getCurrentUrl();
    assert.strictEqual(aktualniURL, "https://example.cypress.io/");
  });
});
