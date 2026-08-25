import { FullConfig } from '@playwright/test';
import { Logger } from './utils/Logger';
import { EnvUtil } from './utils/EnvUtil';
import * as fs from 'fs';

export default async function globalSetup(config: FullConfig) {
    EnvUtil.loadEnv();

    if (!fs.existsSync('test-results')) {
        fs.mkdirSync('test-results', { recursive: true });
    }

    if (!fs.existsSync('test-results/screenshots')) {
        fs.mkdirSync('test-results/screenshots', { recursive: true });
    }

    Logger.info('======================================');
    Logger.info('Automation Execution Started');
    Logger.info(`Environment : ${(process.env.TEST_ENV ?? 'qa').toUpperCase()}`);
    Logger.info(`Project      : ${config.projects[0].name}`);
    Logger.info('======================================');
}