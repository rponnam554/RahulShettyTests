import { Locator, Page, expect } from '@playwright/test';
// import { EnvUtil } from '../../utils/EnvUtil';
import { Logger } from '../utils/Logger';
import { TimeOuts } from '../constants/TimeOuts';

export class UIActions {
    private page: Page;
    public readonly defaultTimeout: number;

    constructor(page: Page) {
        this.page = page;
        this.defaultTimeout = TimeOuts.DEFAULT;
    }

    async click(locator: Locator, description: string): Promise<void> {
        Logger.debug(`Clicking ${description} (${locator.toString()})`);
        await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        await locator.click({ timeout: this.defaultTimeout });
    }

    async waitUntilClickableAndClick(locator: Locator, description: string): Promise<void> {
        Logger.debug(`Wait until clickable and click ${description} (${locator.toString()})`);
        await locator.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        await expect(locator).toBeEnabled({ timeout: this.defaultTimeout });
        await locator.click({ timeout: this.defaultTimeout });
    }

    async enterText(locator: Locator, text: string, description: string): Promise<void> {
        Logger.debug(`Enter text in ${description} (${locator.toString()}): ${text}`);
        await locator.fill(text, { timeout: this.defaultTimeout });
    }

    async clearAndEnterText(locator: Locator, text: string, description: string): Promise<void> {
        Logger.debug(`Clear and enter text in ${description} (${locator.toString()}): ${text}`);
        await locator.clear({ timeout: this.defaultTimeout });
        await locator.fill(text, { timeout: this.defaultTimeout });
    }
    async typeText(locator: Locator, text: string, description: string): Promise<void> {
        Logger.debug(`Typing '${text}' into ${description}`);

        await locator.type(text, { timeout: this.defaultTimeout });
    }

    async selectDropdownByLabel(locator: Locator, label: string): Promise<void> {
        Logger.debug(`Select dropdown by label ${label} (${locator.toString()})`);
        await locator.selectOption({ label: label }, { timeout: this.defaultTimeout });
    }

    async selectDropdownByValue(locator: Locator, value: string): Promise<void> {
        await locator.selectOption({ value: value }, { timeout: this.defaultTimeout });
    }

    async selectDropdownByIndex(locator: Locator, index: number): Promise<void> {
        await locator.selectOption({ index: index }, { timeout: this.defaultTimeout });
    }

    async checkCheckbox(locator: Locator, description: string): Promise<void> {
        await locator.check({ timeout: this.defaultTimeout });
    }

    async uncheckCheckbox(locator: Locator, description: string): Promise<void> {
        await locator.uncheck({ timeout: this.defaultTimeout });
    }

    private async waitForLoadingOverlaysToHide(): Promise<void> {
        Logger.debug('Waiting for loading overlays to hide');
        await Promise.all([
            this.page.locator('.loader').waitFor({ state: 'hidden', timeout: TimeOuts.SPINNER }).catch(() => { }),
            this.page.locator('div.modal-backdrop').waitFor({ state: 'hidden', timeout: TimeOuts.MODAL }).catch(() => { })
        ]);
    }

    async scrollIntoView(locator: Locator, description: string): Promise<void> {
        Logger.debug(`Scroll into view ${description} (${locator.toString()})`);
        await locator.scrollIntoViewIfNeeded({ timeout: this.defaultTimeout });
    }
}