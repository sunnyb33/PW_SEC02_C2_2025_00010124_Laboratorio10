import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser } from '../queries/users.js';

// SIGNUP
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Nombre, email y password son requeridos' });
        }
        

        const existingUser = await getUserByEmail(email);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
        
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        const result = await createUser(name, email, password_hash);
        const newUser = result.rows[0];
        
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_SECRET || 'secret-key-lab8',
            { expiresIn: '1h' }
        );
        
        res.status(201).json({
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
        
    } catch (error) {
        console.error('Error en signUp:', error);
        res.status(500).json({ error: 'Error creando usuario' });
    }
};