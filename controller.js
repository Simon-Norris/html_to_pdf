const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

module.exports = {
    createPDF: async function(req, res, next) {
        console.log(req.body)
        const htmlContent = req.body;

        try {
            // const content = fs.readFileSync(
            //     path.resolve(__dirname, './templates/index.html'),
            //     'utf-8'
            // );
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.setContent(htmlContent);
            const buffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    left: '10px',
                    top: '10px',
                    right: '10px',
                    bottom: '10px'
                }
            });
            await browser.close();
            res.end(buffer);
        } catch (error) {
            next(error); // Pass any errors to the error handling middleware
        }
    }
};
