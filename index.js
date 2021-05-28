const puppeteer = require("puppeteer");
function run() {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const url = "";
      await page.goto("https://randomtodolistgenerator.herokuapp.com/library");
      let urls = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll(".taskCard");
        items.forEach((item, index) => {
          if (index < 4)
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
run().then(console.log).catch(console.error);
