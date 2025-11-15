import { getUsers, getUserById } from '../queries/users.js';

// GET todos los usuarios
export const getUsersList = async (req, res) => {
    try {
        const result = await getUsers();
        res.json(result.rows);
    } catch (error) {
        console.error('Error en getUsersList:', error);
        res.status(500).json({ error: 'Error obteniendo usuarios' });
    }
};

// GET usuario por ID
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getUserById(id);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error en getUser:', error);
        res.status(500).json({ error: 'Error obteniendo usuario' });
    }
};