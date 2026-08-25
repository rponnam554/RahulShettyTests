import { Locator, Page, expect } from '@playwright/test';
import { TimeOuts } from '../constants/TimeOuts';
// import { EnvUtil } from '../../utils/EnvUtil';

export class WaitActions {
    private page: Page;
    private readonly defaultTimeout: number;

    constructor(page: Page) {
        this.page = page;
        this.defaultTimeout = TimeOuts.DEFAULT;
    }

    async waitForVisibleCheck(locator: Locator, timeout?: number): Promise<void> {
        await locator.waitFor({
            state: 'visible',
            timeout: timeout ?? this.defaultTimeout
        });
    }

    async waitForHidden(locator: Locator, timeout?: number): Promise<void> {
        await locator.waitFor({
            state: 'hidden',
            timeout: timeout ?? this.defaultTimeout
        });
    }

    async waitForText(locator: Locator, text: string, timeout?: number): Promise<void> {
        await expect(locator).toHaveText(text, {
            timeout: timeout ?? this.defaultTimeout
        });
    }

    async waitForContainsText(locator: Locator, text: string, timeout?: number): Promise<void> {
        await expect(locator).toContainText(text, {
            timeout: timeout ?? this.defaultTimeout
        });
    }

    async waitForUrl(urlPattern: string | RegExp, timeout?: number): Promise<void> {
        await this.page.waitForURL(urlPattern, {
            timeout: timeout ?? this.defaultTimeout
        });
    }

    async waitForNetworkIdle(timeout?: number): Promise<void> {
        await this.page.waitForLoadState('networkidle', {
            timeout: timeout ?? this.defaultTimeout
        });
    }
}