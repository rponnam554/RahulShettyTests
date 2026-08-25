import {BasePage} from '../pages/BasePage'
import {Locator,Page} from '@playwright/test'

export class LoginLocPage extends BasePage
{
    constructor(page:Page)
    {
        super(page)
    }

    protected get email():Locator{
        return this.page.getByRole('textbox', { name: 'Email' })
    }

    protected get password():Locator{
        return this.page.getByPlaceholder('enter your passsword')
    }

    protected get loginButton():Locator{
        return this.page.getByRole('button', { name: 'Login' })
    }
}
