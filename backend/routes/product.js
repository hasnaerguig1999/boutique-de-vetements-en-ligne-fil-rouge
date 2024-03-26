import { Router } from 'express';
import { createProduct,getProducts,getProduct,updateProduct,deleteProduct,updateProductCategory} from '../controllers/productController';
// import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
router.get('/',getProducts)
// router.use(authMiddleware);
router.post('/',createProduct)
router.get('/:id',getProduct)
router.put('/:id',updateProduct)
// router.put('/:id',updateProductCategory)
router.delete('/:id',deleteProduct)


export default router;