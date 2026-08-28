import { test, expect } from '../fixtures/baseFixture';
import { DashboardPage } from '../pages/DashboardPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage'
import { SoftAssert } from '../assertions/SoftAssert'
import { Logger } from '../utils/Logger'
test('Order one product', async ({ page, loginPage }) => {

    const softAssert = new SoftAssert();

    const flow = [
        loginPage,
        new DashboardPage(page),
        new CartPage(page, softAssert),
        new CheckoutPage(page)
    ];

    for (const step of flow) {
        await step.execute();
    }

    softAssert.assertAll();

    const orderPage = new OrderConfirmationPage(page);

    await orderPage.execute();
});

test('test2',async ({page})=>
{
await page.goto('https://www.cricbuzz.com/');
});
test('test3',async ({page})=>
{
await page.goto('https://www.amazon.in/');
});
test('test4',async ({page})=>
{
await page.goto('https://www.google.com/');
});