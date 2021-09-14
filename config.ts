import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL
}