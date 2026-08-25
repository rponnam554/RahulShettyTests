import { LoginDetails } from "../interfaces/LoginDetails";

function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Required environment variable '${name}' is not configured.`);
    }
    return value;
}

export const users = new Map<string, LoginDetails>([
    [
        "SystemAdmin",
        {
            email: requiredEnv("EMAIL"),
            password: requiredEnv("PASSWORD")
        }
    ]
]);
