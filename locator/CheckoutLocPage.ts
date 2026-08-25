import {BasePage} from '../pages/BasePage'
import {Page,Locator} from '@playwright/test'
export class CheckoutLocPage extends BasePage
{
    constructor(page:Page)
    {
        super(page)
    }
    
    protected get expirySection():Locator
    {
        return this.page.locator("//div[contains(text(),'Expiry Date')]/parent::div")
    }
    protected get creditCard():Locator
    {
        return this.page.locator("//div[contains(text(),'Credit Card Number')]/following-sibling::input")
    }
    protected get month():Locator
    {
        return this.expirySection.locator('select').nth(0)
    } 

    protected get day():Locator
    {
        return this.expirySection.locator('select').nth(1)
    }
    
    protected get cvvCode():Locator
    {
        return this.page.locator("//div[contains(text(),'CVV Code')]/following-sibling::input")
    }

    protected get nameOnCard():Locator
    {
        return this.page.locator("//div[contains(text(),'Name on Card')]/following-sibling::input")
    }
    protected get couponCode():Locator
    {
        return this.page.locator("//div[contains(text(),'Apply Coupon')]/following-sibling::input")
    }
    protected get applyCouponButton():Locator
    {
        return this.page.getByRole('button', { name: 'Apply Coupon' })
    }
    protected get couponApplySuccessMsg():Locator
    {
        return this.page.locator("//p[contains(text(),'Coupon Applied')]")
    }
    protected get countryTextbox():Locator
    {
        return this.page.getByPlaceholder('Select Country')
    }
    protected get autoSuggestionOptions():Locator
    {
        return this.page.locator('.ta-results')
    }
    protected get countrySelection():Locator
    {
        return this.page.locator('.ta-results button').getByText('India', { exact: true })
    }
    protected get placeOrderButton():Locator
    {
        return this.page.getByText('Place Order')
    }
}