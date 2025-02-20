import { Router } from "express"
import { ProductController} from "../controllers/ProductController";
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware"

const productRouter = Router()

const productController = new ProductController()

productRouter.get("/", productController.index);
productRouter.post('/',authenticateUser,  productController.create);
productRouter.get('/:id', productController.show);
productRouter.put('/:id', authenticateUser, productController.update);
productRouter.delete('/:id',authenticateUser, productController.delete);

export {productRouter}