import { Before, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { CustomWorld } from "./world";
import { SoftAssert } from "../../assertions/SoftAssert";

Before(async function (this: CustomWorld) {
    this.softAssert = new SoftAssert();

    this.browser = await chromium.launch({
        headless: process.env.HEADLESS !== "false"
    });

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {
    await this.page?.close().catch(() => undefined);
    await this.context?.close().catch(() => undefined);
    await this.browser?.close().catch(() => undefined);
});
