import { Router } from 'express';
import { getAllCategories,getCategory,createCategory,updateCategory,deleteCategory } from '../controllers/categoryController';

import { adminMiddleware } from '../middlewares/authMiddleware';

const router = Router();



router.get('/', getAllCategories);
router.use(adminMiddleware);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id',deleteCategory);

export default router;