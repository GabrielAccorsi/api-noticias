import { Router } from "express";
import {create, findAll, topPosts, findById , searchByTitle, byUser, update,erase, likePost,addComment} from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middlewares.js";
const router = Router();

router.post("/",authMiddleware,create)
router.get("/",findAll)
router.get("/top", topPosts) 
router.get("/search", searchByTitle)
router.get("/byUser",authMiddleware,byUser)

router.patch("/:id",validId,authMiddleware,update)
router.get("/:id",validId, findById)
router.delete("/:id",validId,authMiddleware,erase)
router.patch("/like/:id",validId,authMiddleware,likePost) 
router.post("/comment/:id",validId,authMiddleware,addComment)



export default router