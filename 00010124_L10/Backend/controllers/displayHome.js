export const displayHome = (req, res) => {
    res.json({ 
        message: '🚀 API Laboratorio X - UCA',
        instruction: 'Usa POST /api/auth/signin para obtener token',
        test_user: {
            email: 'jerry@example.com',
            password: 'password123'
        },
        endpoints: {
            auth: ['POST /api/auth/signin', 'POST /api/auth/signup'],
            users: ['GET /api/users', 'GET /api/users/:id', 'PUT /api/users/:id', 'DELETE /api/users/:id']
        }
    });
};