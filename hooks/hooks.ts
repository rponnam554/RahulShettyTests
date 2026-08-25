import { test as base, Page, TestInfo } from '@playwright/test';
import { Logger } from '../utils/Logger';
import { ScreenshotUtil } from '../utils/ScreenshotUtil';


export function registerHooks(test: typeof base) {

    test.beforeEach(async ({ }, testInfo) => {
        Logger.info('=====================================');
        Logger.info(`Test Name : ${testInfo.title}`);
        Logger.info(`Worker    : ${testInfo.workerIndex}`);
        Logger.info('=====================================');
    });

    test.afterEach(async ({ page }, testInfo) => {

        if (testInfo.status !== testInfo.expectedStatus) {
            const screenshot = await ScreenshotUtil.capture(page, testInfo.title);

            await testInfo.attach('Failure Screenshot', {
                body: screenshot.buffer,
                contentType: 'image/png'
            });
        }

        Logger.info('=====================================');
        Logger.info(`Test Name : ${testInfo.title}`);
        Logger.info(`Status    : ${testInfo.status?.toUpperCase()}`);
        Logger.info(`Duration  : ${testInfo.duration} ms`);
        Logger.info('=====================================');
    });

}