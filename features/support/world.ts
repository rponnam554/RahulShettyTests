import {World,IWorldOptions,setWorldConstructor} from "@cucumber/cucumber";
import {Browser,BrowserContext,Page} from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { DashboardPage } from "../../pages/DashboardPage";
import { CartPage } from "../../pages/CartPage";
import { SoftAssert } from "../../assertions/SoftAssert";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { OrderConfirmationPage } from "../../pages/OrderConfirmationPage";

export class CustomWorld extends World {

    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    loginPage!: LoginPage;
    dashboardPage!: DashboardPage;
    cartPage!:CartPage
    softAssert!:SoftAssert
    checkoutPage!:CheckoutPage
    orderConfirmationPage!:OrderConfirmationPage
    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);