import { Page, Locator, expect } from '@playwright/test'
import { CartLocPage } from '../locator/CartLocPage'
import { TimeOuts } from '../constants/TimeOuts';
import { SoftAssert } from '../assertions/SoftAssert'
import { Logger } from '../utils/Logger';
export class CartPage extends CartLocPage {
    constructor(page: Page, private readonly softAssert: SoftAssert) {
        super(page)
    }

     async verifyPage(): Promise<void> {

        await this.waitActions.waitForContainsText(this.cartButton, "1", TimeOuts.LONG);

        await this.uiActions.click(this.cartButton, "Cart Button");

        await expect(this.myCartHeading).toBeVisible({ timeout: TimeOuts.LONG });
    }

     async performAction(): Promise<void> {
        await this.verifyCartPage(this.softAssert);
    }

    async verifyCartPage(softAssert: SoftAssert) {
        await softAssert.assertTextEquals(this.subTotal, '$11500', 'Subtotal is incorrect');
        Logger.info(`Cart Items Count: ${await this.cartProducts.count()}`);
        const items = await this.cartProducts.allTextContents();
        Logger.info(`Cart Items: ${JSON.stringify(items)}`);
        Logger.info('Clicking Checkout button');
        await this.uiActions.click(this.checkout, 'Checkout button')
        Logger.info('Checkout button clicked');
        await expect(this.page).toHaveURL(/order/)
    }
}