import { Pool } from "pg";

export const pool = new Pool({
    user: 'Patatafeliz',
    host: 'localhost',
    database: 'neondb',
    password: '12345',
    port: 5432,
});

module.exports = {pool};