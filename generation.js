const path = require("path");
const puppeteer = require("puppeteer");

module.exports = {
  createPDF: async function (req, res, next) {
    const { urlToConvert } = req.urlToConvert;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlToConvert, {
      waitUntil: "networkidle2",
    });
    const buffer = await page.pdf({
        format: 'A4',
        printBackground: false,
        margin: {
            left: '0px',
            top: '0px',
            right: '0px',
            bottom: '0px'
        }
    });

    await browser.close();
    res.end(buffer);
  },
};
