import { Router } from 'express';
import { getAllCategories,getCategory,createCategory,updateCategory,deleteCategory } from '../controllers/categoryController';

// import authMiddleware from '../middlewares/authMiddleware';

const router = Router();



router.get('/', getAllCategories);
// router.use(authMiddleware);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id',deleteCategory);

export default router;