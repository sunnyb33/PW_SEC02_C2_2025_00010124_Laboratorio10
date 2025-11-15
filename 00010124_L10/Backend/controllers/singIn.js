import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../queries/users.js';  

// SIGNIN 
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Buscar usuario por email
        const result = await getUserByEmail(email);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        const user = result.rows[0];
        
        // Verificar password (para Jerry: password = "password123")
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        // Generar token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'secret-key-lab8',
            { expiresIn: '1h' }
        );
        
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        console.error('Error en signIn:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};