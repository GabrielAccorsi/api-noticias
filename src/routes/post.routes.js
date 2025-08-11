import { Router } from "express";
import {create, findAll, topPosts, findById} from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/",authMiddleware,create)
router.get("/",findAll)
router.get("/top", topPosts) 
router.get("/:id", findById)


export default router