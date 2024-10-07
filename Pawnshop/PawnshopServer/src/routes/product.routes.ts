import { Router } from 'express';
import { addProduct, getProductById, getAllProducts, updateProduct, deleteProduct } from '../controllers/product.controller';

const router: Router = Router();

// POST: http://localhost:5000/api/products
router.post('/products', addProduct);

// GET ID: http://localhost:5000/api/products/:id
router.get('/products/:id', getProductById);

// GET ALL: http://localhost:5000/api/products
router.get('/products', getAllProducts);

// PUT: http://localhost:5000/api/products/:id
router.put('/products/:id', updateProduct);

// DELETE: http://localhost:5000/api/products/:id
router.delete('/products/:id', deleteProduct);

export default router;
