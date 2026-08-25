import {BasePage} from '../pages/BasePage'
import {Locator,Page} from '@playwright/test'
import productData from '../testdata/productData.json';
export class DashboardLocPage extends BasePage
{
constructor(page:Page)
{
    super(page)
}
protected get dashboardHeading():Locator
{
    return this.page.getByRole('heading', { name: 'Automation' })
}

protected get searchBox():Locator
{
    return this.page.locator('#sidebar').getByPlaceholder('search')
}
protected get selectedProduct():Locator
{
    return this.page.locator('.card-body').filter({ hasText: productData.product })
}
protected get addToCart():Locator
{
    return this.selectedProduct.getByRole('button', { name: 'Add to Cart' })
}

}