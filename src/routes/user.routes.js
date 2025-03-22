import { Router } from "express";
import userController from '../controllers/user.controller.js';
import { validId,validUser } from "../middlewares/global.middlewares.js";

const routes = Router()

routes.post("/",userController.create)
routes.get("/",userController.findAll)
routes.get("/:id",validId,validUser,userController.findById)
routes.patch("/:id",validId,validUser, userController.update)

export default routes