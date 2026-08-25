import { expect, Locator } from '@playwright/test';

/**
 * Utility class to handle soft assertions in Playwright.
 * Records failures without stopping test execution immediately.
 */
export class SoftAssert {
    private readonly failures: string[] = [];

    // --- Value Assertions ---

    assertEquals(actual: unknown, expected: unknown, message?: string): void {
        if (actual !== expected) {
            this.record(message ?? `assertEquals failed - expected: ${String(expected)}, actual: ${String(actual)}`);
        }
    }

    assertNotEquals(actual: unknown, unexpected: unknown, message?: string): void {
        if (actual === unexpected) {
            this.record(message ?? `assertNotEquals failed - value should not equal: ${String(unexpected)}`);
        }
    }

    assertContains(actual: string, substring: string, message?: string): void {
        if (!actual.includes(substring)) {
            this.record(message ?? `assertContains failed - '${actual}' does not contain '${substring}'`);
        }
    }

    assertTrue(condition: boolean, message?: string): void {
        if (!condition) {
            this.record(message ?? 'assertTrue failed - condition was false');
        }
    }

    assertFalse(condition: boolean, message?: string): void {
        if (condition) {
            this.record(message ?? 'assertFalse failed - condition was true');
        }
    }

    assertNull(value: unknown, message?: string): void {
        if (value !== null) {
            this.record(message ?? 'assertNull failed - value was not null');
        }
    }

    assertNotNull(value: unknown, message?: string): void {
        if (value === null || value === undefined) {
            this.record(message ?? 'assertNotNull failed - value was null or undefined');
        }
    }

    // --- Locator/UI Assertions ---

    async assertVisible(locator: Locator, message?: string): Promise<void> {
        try {
            await expect(locator).toBeVisible();
        } catch (e) {
            this.record(message ?? `assertVisible failed - element not visible`);
        }
    }

    async assertHidden(locator: Locator, message?: string): Promise<void> {
        try {
            await expect(locator).toBeHidden();
        } catch (e) {
            this.record(message ?? `assertHidden failed - element is still visible`);
        }
    }

    async assertTextEquals(locator: Locator, expectedText: string, message?: string): Promise<void> {
        try {
            await expect(locator).toHaveText(expectedText);
        } catch (e) {
            this.record(message ?? `assertTextEquals failed - expected text: ${expectedText}`);
        }
    }

    async assertEnabled(locator: Locator, message?: string): Promise<void> {
        try {
            await expect(locator).toBeEnabled();
        } catch (e) {
            this.record(message ?? `assertEnabled failed - element is disabled`);
        }
    }

    

    // --- Lifecycle & Reporting ---

    getFailures(): string[] {
        return [...this.failures];
    }

    hasFailures(): boolean {
        return this.failures.length > 0;
    }

    assertAll(): void {
        if (this.failures.length === 0) return;

        const count = this.failures.length;
        const detail = this.failures.map((f, i) => `${i + 1}. ${f}`).join('\n');
        
        // Clear failures before throwing to ensure clean state for next runs
        this.clear();
        throw new Error(`Soft assertion failures (${count}):\n${detail}`);
    }

    clear(): void {
        this.failures.length = 0;
    }

    private record(message: string): void {
        this.failures.push(message);
    }
}