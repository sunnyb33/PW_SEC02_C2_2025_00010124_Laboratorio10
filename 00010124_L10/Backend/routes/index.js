import express from 'express';


import { signIn } from '../controllers/singin.js';
import { signUp } from '../controllers/singup.js';
import { displayHome } from '../controllers/displayHome.js';
import { getUsersList } from '../controllers/getUsers.js';
import { getUser } from '../controllers/getUsers.js';
import { updateUserData } from '../controllers/updateUsers.js';
import { deleteUserData } from '../controllers/deleteUsers.js';

import { 
    getCustomersList,
    createNewSale,
    getSalesList,
    searchCustomerByCode,
    getSalesReportData
} from '../controllers/customerController.js';


import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Auth routes (sin token)
router.post('/auth/signin', signIn);
router.post('/auth/signup', signUp);

router.get('/', displayHome);

router.get('/users', verifyToken, getUsersList);
router.get('/users/:id', verifyToken, getUser);
router.put('/users/:id', verifyToken, updateUserData);
router.delete('/users/:id', verifyToken, deleteUserData);


router.get('/customers', verifyToken, getCustomersList);
router.get('/customers/search', verifyToken, searchCustomerByCode);

router.get('/sales', verifyToken, getSalesList);
router.post('/sales', verifyToken, createNewSale);
router.get('/sales/report', verifyToken, getSalesReportData);

export default router;