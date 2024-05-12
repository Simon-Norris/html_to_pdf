const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

module.exports = {
    createPDF: async function(req, res, next) {
        try {
            const content = fs.readFileSync(
                path.resolve(__dirname, './templates/index.html'),
                'utf-8'
            );
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.setContent(content);
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
        } catch (error) {
            next(error); // Pass any errors to the error handling middleware
        }
    }
};
