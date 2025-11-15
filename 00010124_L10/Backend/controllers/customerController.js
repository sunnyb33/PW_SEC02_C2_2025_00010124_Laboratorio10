import { 
    getCustomers, 
    createSale, 
    getSalesWithCustomers, 
    getCustomerByCode, 
    getSalesReport,
    customerExists 
} from '../queries/customers.js';

// Ejercicio 2: Listar todos los clientes
export const getCustomersList = async (req, res) => {
    try {
        const result = await getCustomers();
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo clientes' });
    }
};

// Ejercicio 3: Registrar nueva venta
export const createNewSale = async (req, res) => {
    try {
        const { amount, id_customer } = req.body;

        // Validaciones
        if (!amount || !id_customer) {
            return res.status(400).json({ error: 'Amount e id_customer son requeridos' });
        }

        // Verificar que el cliente existe
        const customerExist = await customerExists(id_customer);
        if (!customerExist) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        const result = await createSale(amount, id_customer);
        res.status(201).json({ 
            message: 'Venta registrada exitosamente', 
            sale: result.rows[0] 
        });

    } catch (error) {
        res.status(500).json({ error: 'Error registrando venta' });
    }
};

// Ejercicio 4: Listar ventas con datos del cliente
export const getSalesList = async (req, res) => {
    try {
        const result = await getSalesWithCustomers();
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo ventas' });
    }
};

// Ejercicio 5: Buscar cliente por código
export const searchCustomerByCode = async (req, res) => {
    try {
        const { code } = req.query;
        
        if (!code) {
            return res.status(400).json({ error: 'Parámetro code es requerido' });
        }

        const result = await getCustomerByCode(code);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: 'Error buscando cliente' });
    }
};

// Ejercicio 6: Reporte de ventas por cliente
export const getSalesReportData = async (req, res) => {
    try {
        const result = await getSalesReport();
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error generando reporte' });
    }
};