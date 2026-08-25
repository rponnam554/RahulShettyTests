import dotenv from 'dotenv';
import path from 'path';

export class EnvUtil {

    static loadEnv() {

        const env = (process.env.TEST_ENV || "QA").toLowerCase();

        dotenv.config({
            path: path.resolve(process.cwd(), `.env.${env}`)
        });

    }
}