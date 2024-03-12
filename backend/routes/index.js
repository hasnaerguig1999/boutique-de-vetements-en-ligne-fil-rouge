import { Router } from "express";
import categoryRouter from './category';
import productRouter from './product';
import authRouter from './auth';


const router = Router();

router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/auth", authRouter);


export default router;