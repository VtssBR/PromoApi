import { Router } from "express"
import { UserController} from "../controllers/UserController";
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware"

const userRouter = Router()

const userController = new UserController()

userRouter.get("/",  userController.index);
userRouter.post('/', userController.create);
userRouter.get('/:id',authenticateUser, userController.show);
userRouter.put('/:id',authenticateUser, userController.update);
userRouter.delete('/:id', authenticateUser, isAdmin, userController.delete);

export {userRouter}