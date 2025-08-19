import { Router } from "express";
import {create, findAll, topPosts, findById , searchByTitle, byUser, update,erase, likePost,addComment,deleteComment} from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/",authMiddleware,create)
router.get("/",findAll)
router.get("/top", topPosts) 
router.get("/search", searchByTitle)
router.get("/byUser",authMiddleware,byUser)

router.patch("/:id",authMiddleware,update)
router.get("/:id", findById)
router.delete("/:id",authMiddleware,erase)
router.patch("/like/:id",authMiddleware,likePost) 
router.post("/comment/:id",authMiddleware,addComment)
router.patch("/comment/:idPost/:idComment",authMiddleware,deleteComment)


export default router