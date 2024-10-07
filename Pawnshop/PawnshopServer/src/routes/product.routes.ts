import { Router } from 'express';
import { addProduct } from '../controllers/product.controller';

const router: Router = Router();

// POST: http://localhost:5000/api/products
router.post('/products', addProduct);

export default router;
