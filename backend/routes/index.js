import { Router } from "express";
import categoryRouter from './category';
import productRouter from './product';
import authRouter from './auth';
import { uploadHandler, uploadMiddleware } from "../middlewares/upload";


const router = Router();

router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/upload", uploadMiddleware.single("image"), uploadHandler);

export default router;