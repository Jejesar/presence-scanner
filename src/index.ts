import { log } from "node:console";
import puppeteer from "puppeteer";

const URL = "https://example.com/api/route/scan/me";
var ids = [{ id: "0123456789", name: "Jérôme" }];

(async () => {
    // Launch Puppeteer
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Navigate to the page
    await page.goto(URL, { waitUntil: "networkidle2" });

    // Type the desired sequence
    for (let i = 0; i < ids.length; i++) {
        log("Badge ID: " + ids[i].name + " (" + ids[i].id + ")");
        await page.keyboard.type(ids[i].id);
        await wait(
            Math.floor(Math.random() * 5000) + 5000 // Random delay between 5 and 10 seconds
        );
        if (i < ids.length - 1) {
            await page.reload({ waitUntil: "networkidle2" });
        }
    }

    // Close the browser
    await browser.close();
})();

function wait(ms: number) {
    return new Promise((resolve) => {
        log("Waiting for " + ms + "ms");
        setTimeout(resolve, ms);
    });
}
