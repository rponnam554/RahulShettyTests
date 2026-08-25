import { expect } from '@playwright/test'
import productData from '../testdata/productData.json';
import { DashboardLocPage } from '../locator/DashboardLocPage';
import { TimeOuts } from '../constants/TimeOuts';
export class DashboardPage extends DashboardLocPage {
     async verifyPage(): Promise<void> {
        await expect(this.dashboardHeading).toBeVisible();
    }
     async performAction(): Promise<void> {
        await this.searchAndAddProduct();
    }
    async searchAndAddProduct(): Promise<void> {
        await this.waitActions.waitForVisibleCheck(this.dashboardHeading, TimeOuts.MAX);
        await this.uiActions.enterText(this.searchBox, productData.product, 'SearchBox')
        await this.searchBox.press('Enter')
        await expect(this.selectedProduct).toBeVisible({ timeout: TimeOuts.SHORT })
        await this.uiActions.click(this.addToCart, 'Add to cart')
    }
}