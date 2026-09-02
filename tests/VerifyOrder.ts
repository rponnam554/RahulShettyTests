import { test } from '../fixtures/baseFixture';
import { DashboardPage } from '../pages/DashboardPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { SoftAssert } from '../assertions/SoftAssert';
import { BasePage } from '../pages/BasePage';
test('Verify order @web', async ({ page, loginPage }) => {
    const softAssert = new SoftAssert();
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page, softAssert);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);

    const pages: BasePage[] = [
        loginPage,
        dashboardPage,
        cartPage,
        checkoutPage
    ];

    for (const currentPage of pages) {
        await currentPage.execute();
    }

    softAssert.assertAll();

    const orderId = await orderConfirmationPage.execute();

    await orderConfirmationPage.verifyOrderInOrdersPage(orderId);
});