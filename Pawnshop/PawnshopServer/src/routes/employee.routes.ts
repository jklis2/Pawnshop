import { Router } from 'express';
import { addEmployee, getEmployeeById, getAllEmployees, updateEmployee, deleteEmployee } from '../controllers/employee.controller';

const router: Router = Router();

// POST: http://localhost:5000/api/employees
router.post('/employees', addEmployee);

// GET ID: http://localhost:5000/api/employees/:id
router.get('/employees/:id', getEmployeeById);

// GET ALL: http://localhost:5000/api/employees
router.get('/employees', getAllEmployees);

// PUT: http://localhost:5000/api/employees/:id
router.put('/employees/:id', updateEmployee);

// DELETE: http://localhost:5000/api/employees/:id
router.delete('/employees/:id', deleteEmployee);

export default router;
