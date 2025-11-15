import { updateUser } from '../queries/users.js';

export const updateUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        
        if (!name || !email) {
            return res.status(400).json({ error: 'Nombre y email son requeridos' });
        }
        
        const result = await updateUser(id, name, email);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error en updateUserData:', error);
        res.status(500).json({ error: 'Error actualizando usuario' });
    }
};