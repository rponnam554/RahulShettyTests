import { Locator, Page } from '@playwright/test';
// import { EnvUtil } from '../../utils/EnvUtil';
import { Logger } from '../utils/Logger';
import { TimeOuts } from '../constants/TimeOuts';

export class TableActions {
    private page: Page;
    private readonly defaultTimeout: number;

    constructor(page: Page) {
        this.page = page;
        this.defaultTimeout = TimeOuts.DEFAULT;
    }

    async getRowCount(tableLocator: Locator): Promise<number> {
        return tableLocator.locator('tbody tr').count();
    }

    async getCellText(tableLocator: Locator, row: number, column: number): Promise<string> {
        const cell = tableLocator.locator(`tbody tr:nth-child(${row}) td:nth-child(${column})`);
        await cell.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        return (await cell.textContent() ?? '').trim();
    }

    async getColumnHeaders(tableLocator: Locator): Promise<string[]> {
        const headers = tableLocator.locator('thead th');
        const count = await headers.count();
        const texts: string[] = [];
        for (let i = 0; i < count; i++) {
            texts.push((await headers.nth(i).textContent() ?? '').trim());
        }
        return texts;
    }

    async findRowByColumnValue(tableLocator: Locator, value: string, columnIndex: number): Promise<number | null> {
        Logger.debug(`Searching table for '${value}' in column ${columnIndex}`);
        const rows = tableLocator.locator('tbody tr');
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
            const cellText = (await rows.nth(i).locator(`td:nth-child(${columnIndex})`).textContent() ?? '').trim();
            if (cellText === value) {
                return i + 1; // 1-based index
            }
        }
        return null;
    }

    async clickRowAction(tableLocator: Locator, rowIdentifier: string, actionLabel: string): Promise<void> {
        Logger.debug(`Clicking '${actionLabel}' on row containing '${rowIdentifier}'`);
        const row = tableLocator.locator(`tbody tr:has-text("${rowIdentifier}")`).first();
        await row.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        await row.getByRole('button', { name: actionLabel }).click();
    }

    async getAllRowData(tableLocator: Locator): Promise<string[][]> {
        const rows = tableLocator.locator('tbody tr');
        const rowCount = await rows.count();
        const result: string[][] = [];

        for (let r = 0; r < rowCount; r++) {
            const cells = rows.nth(r).locator('td');
            const cellCount = await cells.count();
            const rowData: string[] = [];
            for (let c = 0; c < cellCount; c++) {
                rowData.push((await cells.nth(c).textContent() ?? '').trim());
            }
            result.push(rowData);
        }
        return result;
    }
}