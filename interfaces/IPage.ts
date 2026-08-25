// interfaces/IPage.ts

export interface IPage {
    verifyPage(): Promise<void>;
    performAction(): Promise<any>;
}