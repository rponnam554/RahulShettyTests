import { LoginLocPage } from "../locator/LoginLocPage";
import {expect} from '@playwright/test'
import { UIActions } from "../actions/UIActions";
import { LoginDetails } from "../interfaces/LoginDetails";
import { users } from "../utils/UserMap";
export class LoginPage extends LoginLocPage {
     async verifyPage(): Promise<void> {
        await expect(this.loginButton).toBeVisible();
    }
     async performAction(): Promise<void> {
        //  await this.login({email: process.env.EMAIL!,password: process.env.PASSWORD!});
     // Default login user
        const loginDetails = users.get("SystemAdmin")!;

        await this.login(loginDetails);
    }
    async login(loginDetails: LoginDetails) { 
        await this.uiActions.enterText(this.email, loginDetails.email, "Email");
        await this.uiActions.enterText(this.password, loginDetails.password, "Password");
        await this.uiActions.click(this.loginButton, "Login");
        await expect(this.page).toHaveURL(/dashboard/);
    }
}
