import { Logger } from './utils/Logger';

export default async function globalTeardown() {

    Logger.info('======================================');
    Logger.info('Automation Execution Finished');
    Logger.info('======================================');
}