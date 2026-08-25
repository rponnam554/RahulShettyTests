import { defineConfig, devices } from '@playwright/test';
import { EnvUtil } from './utils/EnvUtil';

// Load environment variables before Playwright starts
EnvUtil.loadEnv();

export default defineConfig({

    testDir: './tests',

    testMatch: '**/*.ts',

    timeout: Number(process.env.TIMEOUT || 30000),

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['html'],
        ['list']
    ],
    globalSetup: require.resolve('./globalSetup'),

    globalTeardown: require.resolve('./globalTeardown'),

    use: {

        // comes from .env.qa / .env.dev
        baseURL: process.env.BASE_URL,

        trace: 'retain-on-failure',

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        headless: process.env.HEADLESS !== 'false',

    },


    projects: [

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],headless:false,
            },
        }

    ]

});