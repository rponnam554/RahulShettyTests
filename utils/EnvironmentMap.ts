/**
 * Resolves environment URLs after environment variables have been loaded.
 * Do not read process.env at module-import time because EnvUtil loads .env
 * files during Playwright configuration/setup.
 */
export function getEnvironmentUrl(environment = process.env.TEST_ENV): string {
    const env = (environment || 'QA').toUpperCase();

    const url = env === 'QA'
        ? process.env.QA_URL || process.env.BASE_URL
        : process.env[`${env}_URL`];

    if (!url) {
        throw new Error(
            `URL not configured for environment '${env}'. ` +
            `Expected ${env}_URL or BASE_URL for QA.`
        );
    }

    return url;
}
