import { deleteUser } from '../queries/users.js';

// DELETE usuario
export const deleteUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteUser(id);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.json({ 
            message: 'Usuario eliminado correctamente', 
            deletedUser: result.rows[0] 
        });
    } catch (error) {
        console.error('Error en deleteUserData:', error);
        res.status(500).json({ error: 'Error eliminando usuario' });
    }
};