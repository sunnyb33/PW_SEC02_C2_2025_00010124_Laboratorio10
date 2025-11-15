import { pool } from '../config/database.js';

// Para auth
export const getUserByEmail = async (email) => {
    return await pool.query('SELECT * FROM users WHERE email = $1', [email]);
};

export const createUser = async (name, email, password_hash) => {
    return await pool.query(
        'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password_hash]
    );
};

// Para user CRUD
export const getUsers = async () => {
    return await pool.query('SELECT id, name, email FROM users ORDER BY id ASC');
};

export const getUserById = async (id) => {
    return await pool.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
};

export const updateUser = async (id, name, email) => {
    return await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
        [name, email, id]
    );
};

export const deleteUser = async (id) => {
    return await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
};