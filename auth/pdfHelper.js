import { renderToStaticMarkup } from 'react-dom/server';

const isProd = process.env.NODE_ENV !== "development";

export const componentToPDFBuffer = async (component) => {
    const html = renderToStaticMarkup(component);

    let browser;
    if (isProd) {
        const chromium = require("@sparticuz/chromium");
        const puppeteer = require("puppeteer-core");
        browser = await puppeteer.launch({
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
            defaultViewport: chromium.defaultViewport,
            args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        });
    } else {
        const puppeteer = require("puppeteer");
        browser = await puppeteer.launch({ headless: "new" });
    }

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
        format: "A4",
        landscape: true,
        printBackground: true,
    });

    await browser.close();
    return pdfBuffer;
};

export default {
    componentToPDFBuffer
};