import { Pool } from "pg";

export const db = new Pool({
    user: "me",
    host: "localhost",
    database: 'api',
    password: 'password',
    port: 5432,
    ssl: {rejectUnauthorized: false},
})