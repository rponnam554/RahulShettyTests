import { Page, expect } from '@playwright/test'
import productData from '../testdata/productData.json';
// import {BasePage} from '../pages/BasePage'
import {CheckoutLocPage} from '../locator/CheckoutLocPage'
import { TimeOuts } from '../constants/TimeOuts';
export class CheckoutPage extends CheckoutLocPage
{
    constructor(page:Page)
    {
        super(page)
    }
     async verifyPage(): Promise<void> {
        await expect(this.creditCard).toBeVisible();
    }

     async performAction(): Promise<void> {
        await this.verifyCheckoutPage();
    }

    async verifyCheckoutPage()
    {
    await this.uiActions.clearAndEnterText(this.creditCard,productData.creditCardNumber,'Creditcard field')
    await this.dropdownActions.selectNativeByValue(this.month,productData.monthNumber);
    await this.dropdownActions.selectNativeByValue(this.day,productData.dayNumber)
    await this.uiActions.enterText(this.cvvCode,productData.cvv,'CVV Field')
    await this.uiActions.enterText(this.nameOnCard,productData.name,'Name on CARD')
    await this.uiActions.enterText(this.couponCode,productData.couponCode,'Coupon Code field')
    await this.uiActions.click(this.applyCouponButton,'Apply coupon')
    await this.waitActions.waitForVisibleCheck(this.couponApplySuccessMsg,TimeOuts.MEDIUM)
    await this.uiActions.typeText(this.countryTextbox,'ind','Country auto suggest')
    await this.waitActions.waitForVisibleCheck(this.autoSuggestionOptions,TimeOuts.MEDIUM)
    await this.uiActions.click(this.countrySelection,'Country selection')
    await this.uiActions.click(this.placeOrderButton,'Place Order')
        }
}