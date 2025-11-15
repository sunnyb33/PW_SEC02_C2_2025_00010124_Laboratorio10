import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Routes
app.use('/api', router);

// Info endpoint para probar
app.get('/info', (req, res) => {
    res.json({
        message: 'API Laboratorio X - UCA',
        endpoints: {
            auth: ['POST /api/auth/signin', 'POST /api/auth/signup'],
            users: ['GET /api/users', 'GET /api/users/:id', 'PUT /api/users/:id', 'DELETE /api/users/:id'],
            customers: ['GET /api/customers', 'GET /api/customers/search?code=XYZ'],
            sales: ['GET /api/sales', 'POST /api/sales', 'GET /api/sales/report']
        },
        test_user: {
            email: 'jerry@example.com',
            password: 'password123'
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
    console.log(`📋 Nuevos endpoints Laboratorio X:`);
    console.log(`   GET  /api/customers`);
    console.log(`   GET  /api/customers/search?code=XYZ`);
    console.log(`   GET  /api/sales`);
    console.log(`   POST /api/sales`);
    console.log(`   GET  /api/sales/report`);
});