import { Page } from '@playwright/test';
import { UIActions } from '../actions/UIActions';
import { WaitActions } from '../actions/WaitActions';
import { DropdownActions } from '../actions/DropdownActions';
import { TableActions } from '../actions/TableActions';
import { IPage } from "../interfaces/IPage";
export abstract class BasePage implements IPage {
    page:Page
    protected uiActions: UIActions;
    protected waitActions: WaitActions;
    protected dropdownActions: DropdownActions;
    protected tableActions: TableActions;
     async verifyPage(): Promise<void> {
        throw new Error(`${this.constructor.name}.verifyPage() is not implemented`);
     }

     async performAction(): Promise<any> {
        throw new Error(`${this.constructor.name}.performAction() is not implemented`);
     }
constructor(page:Page)
{
    this.page=page
    this.uiActions = new UIActions(page);
    this.waitActions=new WaitActions(page);
    this.dropdownActions=new DropdownActions(page);
    this.tableActions=new TableActions(page);
}
    async execute(): Promise<any> {
        await this.verifyPage();
        return await this.performAction();
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }
}