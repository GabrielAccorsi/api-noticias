import { Router } from "express";
import {create, findAll} from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/",authMiddleware,create)
router.get("/",findAll)

// // Rota para criar um novo tópico 
// router.post('/topics', authMiddleware, forumController.createTopic);

// // Rota para editar um tópico 
// router.put('/topics/:id', authMiddleware, forumController.editTopic);

// // Rota para excluir um tópico 
// router.delete('/topics/:id', authMiddleware, forumController.deleteTopic);

// // Rota para criar um comentário em um tópico 
// router.post('/topics/:id/comments', authMiddleware, forumController.createComment);

// // Rota para visualizar um tópico 
// router.get('/public/:id', forumController.viewTopic);

// // Rota para visualizar todos os tópicos 
// router.get('/public', forumController.getAllTopics);

// // Rota para dar like em um comentário ou tópico 
// router.post('/topics/:id/like', authMiddleware, forumController.likeTopic);

// // Rota para seguir um tópico 
// router.post('/topics/:id/follow', authMiddleware, forumController.followTopic);

// // Rota para marcar um tópico como resolvido 
// router.post('/topics/:id/resolve', authMiddleware, forumController.resolveTopic);

// // Rota para buscar tópicos por tag 
// router.get('/public/tag/:tag', forumController.getTopicsByTag);

// // Rota para pegar tópicos ordenados por relevância
// router.get('/public/relevantes', forumController.getRelevantTopics);




export default router