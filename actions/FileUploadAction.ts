import { Locator, Page } from '@playwright/test';
import * as fs from 'fs';
// import { EnvUtil } from '../../utils/EnvUtil';
import { Logger } from '../utils/Logger';
import { TimeOuts } from '../constants/TimeOuts';

export class FileUploadActions {
    private page: Page;
    private readonly defaultTimeout: number;

    constructor(page: Page) {
        this.page = page;
        this.defaultTimeout = TimeOuts.DEFAULT
    }

    async uploadViaInput(inputLocator: Locator, filePath: string): Promise<void> {
        FileUploadActions.assertFileExists(filePath);
        Logger.debug(`Uploading file via input: ${filePath}`);
        await inputLocator.setInputFiles(filePath, { timeout: this.defaultTimeout });
    }

    async uploadViaDialog(triggerLocator: Locator, filePath: string): Promise<void> {
        FileUploadActions.assertFileExists(filePath);
        Logger.debug(`Uploading file via dialog: ${filePath}`);
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser', { timeout: this.defaultTimeout }),
            triggerLocator.click()
        ]);
        await fileChooser.setFiles(filePath);
    }

    private static assertFileExists(filePath: string): void {
        if (!fs.existsSync(filePath)) {
            throw new Error(`Upload file not found: ${filePath}`);
        }
    }
}