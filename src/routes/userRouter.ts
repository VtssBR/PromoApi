import { Router } from "express"
import { UserController} from "../controllers/UserController";
import { authenticateUser, isAdmin } from "../middlewares/AuthMiddleware"

const userRouter = Router()

const userController = new UserController()

userRouter.get("/",  userController.index);
userRouter.post('/', userController.create);
userRouter.get('/:id', userController.show);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);

export {userRouter}