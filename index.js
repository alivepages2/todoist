const puppeteer = require("puppeteer");

// Get a list of tasks from https://randomtodolistgenerator.herokuapp.com/library
function getTasks() {
  return new Promise(async (resolve, reject) => {
    try {
      //const browser = await puppeteer.launch();
      const browser = await puppeteer.launch({
        headless: false,
        slowMo: 1,
        defaultViewport: null,
      });
      const page = await browser.newPage();
      await page.goto("https://randomtodolistgenerator.herokuapp.com/library");
      let urls = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll(".taskCard");
        items.forEach((item, index) => {
          results.push({
            text: item.innerText.split("\n"),
          });
        });
        return results;
      });
      browser.close();
      return resolve(urls);
    } catch (e) {
      return reject(e);
    }
  });
}

// login in todoist
function login(value) {
  return new Promise(async (resolve, reject) => {
    try {
      const browser1 = await puppeteer.launch({
        headless: false,
        slowMo: 1,
        defaultViewport: null,
      });

      const page1 = await browser1.newPage();
      await page1.goto("https://todoist.com/users/showlogin");

      await page1.type("#email", "soporte@alivepages.com");
      await page1.type("#password", "alive+123");
      await page1.click("button");

      //await page1.waitForSelector("button.plus_add_button");
      await page1.waitForTimeout(20000);

      // put task  in todoist

      console.log("ya");

      await page1.click("button.plus_add_button");
      await page1.type("*[data-text=true]", "tarea 1");

      await page1.click(".ist_button_red");
      await page1.type("*[data-text=true]", "tarea 2");

      await page1.click(".ist_button_red");
    } catch (e) {
      return reject(e);
    }
  });
}
getTasks().then(login()).catch(console.error);
//login().catch(console.error);
