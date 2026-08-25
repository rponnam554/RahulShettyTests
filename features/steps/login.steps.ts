import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { LoginPage } from "../../pages/LoginPage";
import { DashboardPage } from "../../pages/DashboardPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { OrderConfirmationPage } from "../../pages/OrderConfirmationPage";

import { CustomWorld } from "../support/world";
import { getEnvironmentUrl } from "../../utils/EnvironmentMap";
import { users } from "../../utils/UserMap";


Given("I am on the login page",async function (this: CustomWorld) {

        const env = (process.env.TEST_ENV || "QA").toUpperCase();
        const baseUrl = getEnvironmentUrl(env);

        console.log("Environment:", env);
        console.log("URL:", baseUrl);

        this.loginPage = new LoginPage(this.page);

        await this.loginPage.navigate(baseUrl);
        await this.loginPage.verifyPage();
    }
);


When("I login as SystemAdmin",async function (this: CustomWorld) {

        const loginDetails = users.get("SystemAdmin");

        if (!loginDetails) {
            throw new Error("SystemAdmin user not found in UserMap");
        }

        await this.loginPage.login(loginDetails);
    }
);


Then("I should see the dashboard",async function (this: CustomWorld) {

        await expect(this.page).toHaveURL(/dashboard/);

        this.dashboardPage = new DashboardPage(this.page);

        await this.dashboardPage.verifyPage();
    }
);


When("I search and add the product",async function (this: CustomWorld) {

        await this.dashboardPage.performAction();
    }
);


When("I go to the cart",async function (this: CustomWorld) {

        this.cartPage = new CartPage(
            this.page,
            this.softAssert
        );
    }
);


Then("I should see the cart",async function (this: CustomWorld) {

        await this.cartPage.verifyPage();
    }
);


When("I verify the cart and checkout",async function (this: CustomWorld) {

        await this.cartPage.performAction();
    }
);


When("I go to the checkout",async function (this: CustomWorld) {

        this.checkoutPage = new CheckoutPage(this.page);
    }
);


Then("I should see the checkout page",async function (this: CustomWorld) {

        await this.checkoutPage.verifyPage();
    }
);


When("I verify the checkout",async function (this: CustomWorld) {

        await this.checkoutPage.performAction();
    }
);


When("I go to order confirmation",async function (this: CustomWorld) {

        this.orderConfirmationPage =
            new OrderConfirmationPage(this.page);
    }
);


Then("I should see the order confirmation",async function (this: CustomWorld) {

        await this.orderConfirmationPage.verifyPage();
    }
);


When("I verify the order confirmation",async function (this: CustomWorld) {

        await this.orderConfirmationPage.performAction();
    }
);