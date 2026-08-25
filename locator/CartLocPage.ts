import {BasePage} from '../pages/BasePage'
import {Page,Locator} from '@playwright/test'
export class CartLocPage extends BasePage
{
    
    constructor(page:Page)
    {
        super(page)
    }

    protected get cartButton():Locator
    {
        return this.page.locator("//button[contains(@routerlink,'cart')]")
    }
    protected get myCartHeading():Locator
    {
        return this.page.getByRole('heading', { name: 'My Cart' })
    }
    protected get subTotal():Locator
    {
        return this.page.locator('.totalRow .value').first()
    }
    protected get checkout():Locator
    {
        return this.page.getByRole('button', { name: 'Checkout' })
    }

    protected get cartProducts():Locator
    {
        return this.page.locator('.cartSection h3');
    }
}