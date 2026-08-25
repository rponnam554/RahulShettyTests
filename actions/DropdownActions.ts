import { Locator, Page } from '@playwright/test';
import { UIActions } from './UIActions';
import { Logger } from '../utils/Logger';
import { TimeOuts } from '../constants/TimeOuts';
// import { EnvUtil } from '../../utils/EnvUtil';

export class DropdownActions {
    private ui: UIActions;
    private readonly defaultTimeout: number;

    constructor(page: Page) {
        this.ui = new UIActions(page);
        this.defaultTimeout = TimeOuts.DEFAULT;
    }

    async selectNativeByValue(locator: Locator, label: string): Promise<void> {
        await this.ui.selectDropdownByValue(locator, label);
    }

    async selectNativeByIndex(locator: Locator, index: number): Promise<void> {
        await this.ui.selectDropdownByIndex(locator, index);
    }

    async selectDropdownByPartialLabel(locator: Locator, partialLabel: string): Promise<void> {
        Logger.debug(`Selecting option containing '${partialLabel}' from dropdown`);
        
        const optionTexts = await locator.locator('option').allTextContents();
        const matchingLabel = optionTexts
            .map(option => option.trim())
            .find(option => option.toLowerCase().includes(partialLabel.toLowerCase()));

        if (matchingLabel) {
            await locator.selectOption({ label: matchingLabel }, { timeout: this.defaultTimeout });
        } else {
            throw new Error(`No dropdown option found containing label '${partialLabel}' in ${locator.toString()}`);
        }
    }

    async selectCustom(triggerLocator: Locator, optionsListLocator: Locator, optionText: string): Promise<void> {
        Logger.debug(`Selecting option '${optionText}' from custom dropdown`);
        await this.ui.click(triggerLocator, 'custom dropdown trigger');
        await optionsListLocator.waitFor({ state: 'visible' });
        await optionsListLocator.getByText(optionText, { exact: true }).click();
    }

    async getSelectedText(locator: Locator): Promise<string> {
        return await locator.evaluate((el: HTMLSelectElement) => {
            return el.options[el.selectedIndex]?.text ?? '';
        });
    }

    async isOptionPresent(locator: Locator, optionLabel: string): Promise<boolean> {
        const options = await locator.locator('option').allTextContents();
        const matchingLabel = options.find(option => option.trim() === optionLabel.trim());
        return !!matchingLabel;
    }
}