import { Router } from 'express';
import { addProduct, getProductById, getAllProducts, updateProduct, deleteProduct } from '../controllers/product.controller';
import multer from 'multer';

const router: Router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/products', upload.array('productImages'), addProduct);
router.get('/products/:id', getProductById);
router.get('/products', getAllProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;