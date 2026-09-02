import { expect } from '@playwright/test'
import { TimeOuts } from '../constants/TimeOuts';
import { OrderConfirmationLocPage } from '../locator/OrderConfirmationLocPage'
import { Logger } from '../utils/Logger';
export class OrderConfirmationPage extends OrderConfirmationLocPage {
    constructor(page: Page) {
        super(page)
     }
     async verifyPage(): Promise<void> {
        await expect(this.thankYouMessage).toBeVisible();
    }

     async performAction(): Promise<string> {
        return await this.verifyOrderConfirmationPage();
    }
    
    async verifyOrderConfirmationPage(): Promise<string> {
        let orderId = "";
            await this.waitActions.waitForVisibleCheck(this.thankYouMessage, TimeOuts.LONG)
            orderId = (await this.orderId.textContent())!.replace(/\|/g, '').trim();
            Logger.info(`Generated Order ID: ${orderId}`);
        
        return orderId

    }

    async verifyOrderInOrdersPage(orderId: string) {
        
            await this.uiActions.click(this.ordersButton, 'Orders Button');
            const allOrderIDs = await this.orderList.allTextContents();
            Logger.debug(`Order IDs: ${JSON.stringify(allOrderIDs)}`);
            await expect(allOrderIDs).toContain(orderId);
            const viewButton = this.page.locator(`//table[.//th[normalize-space()='Order Id']]//tr[th[normalize-space()='${orderId}']]//button[normalize-space()='View']`)
            await this.uiActions.click(viewButton, 'View Button');
            const newOrderId = this.page.locator(`//div[text()='${orderId}']`) 
            await this.waitActions.waitForVisibleCheck(newOrderId, TimeOuts.LONG)
        
    }
}