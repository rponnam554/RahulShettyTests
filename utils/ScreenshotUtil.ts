import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export interface ScreenshotResult {
    filePath: string;
    buffer: Buffer;
}

export class ScreenshotUtil {

    private static readonly SCREENSHOT_DIR = 'test-results/screenshots';

    private static ensureDirectory(): void {
        if (!fs.existsSync(this.SCREENSHOT_DIR)) {
            fs.mkdirSync(this.SCREENSHOT_DIR, { recursive: true });
        }
    }

    static async capture(
        page: Page,
        name: string
    ): Promise<ScreenshotResult> {

        this.ensureDirectory();

        const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_');

        const filePath = path.join(
            this.SCREENSHOT_DIR,
            `${safeName}_${Date.now()}.png`
        );

        const buffer = await page.screenshot({
            path: filePath,
            fullPage: true
        });

        return {
            filePath,
            buffer
        };
    }
}