import { Router } from "express"
import {userRouter} from "./userRouter";
import { productRouter } from "./productRouter";
import { categoryRouter } from "./categoryRouter";

const router = Router()


router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categorys", categoryRouter);


export {router}