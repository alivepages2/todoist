const puppeteer = require("puppeteer");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
function login(data) {
  console.log("data", data[0]);

  /*
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

      await page1.waitForXPath(
        "/html/body/div[1]/div/div[2]/div[2]/main/div/div/div/section/div/ul/li/button",
        {
          timeout: 50000,
        }
      );

      // put task in todoist

      console.log("ya");

      let elements = await page1.$x(
        "/html/body/div[1]/div/div[2]/div[2]/main/div/div/div/section/div/ul/li/button"
      );
      await elements[0].click();

      await page1.type("*[data-text=true]", "joel");
      elements = await page1.$x(
        '//*[@id="agenda_view"]/div/section/div/ul/li/form/div[2]/button[1]'
      );
      await elements[0].click();

      await page1.type("*[data-text=true]", "fagundo");
      elements = await page1.$x(
        '//*[@id="agenda_view"]/div/section/div/ul/li[2]/form/div[2]/button[1]'
      );
      await elements[0].click();

      await page1.type("*[data-text=true]", "sierra");
      elements = await page1.$x(
        '//*[@id="agenda_view"]/div/section/div/ul/li[3]/form/div[2]/button[1]'
      );
      await elements[0].click();

      await page1.type("*[data-text=true]", "ok");
      elements = await page1.$x(
        '//*[@id="agenda_view"]/div/section/div/ul/li[4]/form/div[2]/button[1]'
      );
      await elements[0].click();
    } catch (e) {
      return reject(e);
    }
    
  });
  */
}
getTasks().then(login).catch(console.error);
//login().catch(console.error);
