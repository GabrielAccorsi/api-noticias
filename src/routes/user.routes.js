import { Router } from "express";
import userController from '../controllers/user.controller.js';
import { validId,validUser } from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeUser } from "../middlewares/authorize.middleware.js";

const routes = Router()

routes.post("/",userController.create)
routes.get("/",authMiddleware,userController.findAll)
routes.get("/:id",validId,validUser,userController.findById)
routes.patch("/:id",authMiddleware,validId,validUser,authorizeUser, userController.update)

export default routes