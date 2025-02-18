import { Router } from "express"
import { CategoryController} from "../controllers/CategoryController";

const categoryRouter = Router()

const categoryController = new CategoryController()

categoryRouter.get("/", categoryController.index);
categoryRouter.post('/', categoryController.create);
categoryRouter.get('/:id', categoryController.show);
categoryRouter.put('/:id', categoryController.update);
categoryRouter.delete('/:id', categoryController.delete);

export {categoryRouter}