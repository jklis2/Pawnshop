import { Router } from 'express';
import { addCustomer, getCustomerById, getAllCustomers, updateCustomer } from '../controllers/customer.controller';

const router: Router = Router();

// POST: http://localhost:5000/api/customers

router.post('/customers', addCustomer);
// GET ID: http://localhost:5000/api/customers/:id
router.get('/customers/:id', getCustomerById);

// GET ALL: http://localhost:5000/api/customers
router.get('/customers', getAllCustomers);

// PUT: http://localhost:5000/api/customers/:id
router.put('/customers/:id', updateCustomer);

export default router;
