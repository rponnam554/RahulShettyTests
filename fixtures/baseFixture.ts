import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { registerHooks } from "../hooks/hooks";
import { getEnvironmentUrl } from "../utils/EnvironmentMap";

type MyFixtures = {
    loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({

    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        try {

            await loginPage.navigate(getEnvironmentUrl());

            await use(loginPage);

        } catch (error) {

            await page.screenshot({
                path: `test-results/login-error-${Date.now()}.png`,
                fullPage: true
            });

            throw error;
        }

    }

});

registerHooks(test);

export { expect } from "@playwright/test";