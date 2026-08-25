import { BasePage } from "../pages/BasePage";
import { Locator,Page } from "@playwright/test";

export class OrderConfirmationLocPage extends BasePage
{
    constructor(page:Page)
    {
        super(page)
    }

    protected get thankYouMessage():Locator
    {
        return this.page.getByRole('heading', { name: 'Thankyou for the order.' })
    }
    protected get orderId():Locator
    {
        return this.page.locator("//label[contains(text(),'Orders History Page')]/ancestor::tr/following-sibling::tr//label")
    }
    protected get ordersButton():Locator
    {
        return this.page.locator("//button[contains(@routerlink,'orders')]")
    }
    protected get orderList():Locator
    {
        return this.page.locator("//th[normalize-space()='Order Id']/ancestor::thead/following-sibling::tbody//tr/th")
    }
}