import { renderToStaticMarkup } from 'react-dom/server';
import fs from "fs";
import path from "path";

const isProd = process.env.NODE_ENV !== "development";

export const componentToPDFBuffer = async (component) => {
    let html = renderToStaticMarkup(component);

    const globalCSS = fs.readFileSync(path.resolve(process.cwd(), "styles", "globals.css"), 'utf-8');
    const latoLight = fs.readFileSync(path.resolve(process.cwd(), "fonts", "Lato", "Lato-Light.ttf")).toString("base64");
    const latoRegular = fs.readFileSync(path.resolve(process.cwd(), "fonts", "Lato", "Lato-Regular.ttf")).toString("base64");
    const latoBold = fs.readFileSync(path.resolve(process.cwd(), "fonts", "Lato", "Lato-Bold.ttf")).toString("base64");
    const mrsSaint = fs.readFileSync(path.resolve(process.cwd(), "fonts", "MrsSaintDelafield", "MrsSaintDelafield-Regular.ttf")).toString("base64");

    const styles = `
        <style>
        ${globalCSS}
        @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 300;
            src: url(data:font/truetype;charset=utf-8;base64,${latoLight}) format('truetype');
        }
        @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            src: url(data:font/truetype;charset=utf-8;base64,${latoRegular}) format('truetype');
        }
        @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 700;
            src: url(data:font/truetype;charset=utf-8;base64,${latoBold}) format('truetype');
        }
        @font-face {
            font-family: 'Mrs Saint Delafield';
            font-style: normal;
            font-weight: 400;
            src: url(data:font/truetype;charset=utf-8;base64,${mrsSaint}) format('truetype');
        }
        </style>
    `;

    html = html.replace('</head>', `${styles}</head>`);

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