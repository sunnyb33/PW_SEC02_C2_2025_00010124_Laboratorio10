import { pool } from '../config/database.js';

// Ejercicio 2: 
export const getCustomers = async () => {
    return await pool.query('SELECT * FROM customers ORDER BY id ASC');
};

// Ejercicio 3: 
export const createSale = async (amount, id_customer) => {
    return await pool.query(
        'INSERT INTO sales (amount, id_customer, created_at) VALUES ($1, $2, NOW()) RETURNING *',
        [amount, id_customer]
    );
};

// Ejercicio 4:
export const getSalesWithCustomers = async () => {
    return await pool.query(`
        SELECT s.id, s.amount, s.created_at, c.name as customer_name
        FROM sales s 
        JOIN customers c ON s.id_customer = c.id
        ORDER BY s.created_at DESC
    `);
};

// Ejercicio 5: 
export const getCustomerByCode = async (code) => {
    return await pool.query('SELECT * FROM customers WHERE code = $1', [code]);
};

// Ejercicio 6: 
export const getSalesReport = async () => {
    return await pool.query(`
        SELECT c.name, SUM(s.amount) AS total_sales
        FROM sales s 
        JOIN customers c ON s.id_customer = c.id 
        GROUP BY c.name 
        ORDER BY total_sales DESC
    `);
};

// Verificar si cliente existe (para validaciones)
export const customerExists = async (id) => {
    const result = await pool.query('SELECT id FROM customers WHERE id = $1', [id]);
    return result.rows.length > 0;
};