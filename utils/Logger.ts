export class Logger {

    static info(message: string): void {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }

    static warn(message: string): void {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
    }

    static error(message: string, error?: unknown): void {
        console.error(
            `[ERROR] ${new Date().toISOString()} - ${message}`,
            error
        );
    }

    static debug(message: string): void {
        console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    }
}