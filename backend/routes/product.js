import { Router } from 'express';
import { createProduct,getProducts,getProduct,updateProduct,deleteProduct} from '../controllers/productController';
import {adminMiddleware }from '../middlewares/authMiddleware';

const router = Router();
router.get('/',getProducts)
router.get('/:id',getProduct)
// router.use(adminMiddleware);
router.post('/',adminMiddleware,createProduct)
router.put('/:id',adminMiddleware,updateProduct)
router.delete('/:id',adminMiddleware,deleteProduct)


export default router;