import { Router } from "express"
import {userRouter} from "./userRouter";
import { productRouter } from "./productRouter";
import { categoryRouter } from "./categoryRouter";
import { authRouter } from "./authRouter";

const router = Router()


router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use('/authentication', authRouter )


export {router}