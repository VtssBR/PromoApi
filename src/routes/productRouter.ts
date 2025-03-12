import { Router } from "express"
import { ProductController} from "../controllers/ProductController";
import { authenticateUser, isAdmin } from "../middlewares/AuthMiddleware"

const productRouter = Router()

const productController = new ProductController()

productRouter.get("/", productController.index);
productRouter.post('/', authenticateUser, productController.create);
productRouter.get('/:id', productController.show);
productRouter.put('/:id',  productController.update);
productRouter.delete('/:id', productController.delete);

export {productRouter}