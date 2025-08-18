import { text } from "express";
import {
  createService,
  findAllService,
  countPosts,
  topPostsService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
  eraseService,
  likePostService,
  deleteLikePostService,
  addCommentService,
  deleteCommentService
} from "../services/post.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      return res.status(400).send({
        message: "Subimit all fiends for registration",
      });
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const findAll = async (req, res) => {
  let { limit, offset } = req.query;

  limit = Number(limit);
  offset = Number(offset);

  if (!limit) limit = 5;
  if (!offset) offset = 0;

  const posts = await findAllService(offset, limit);
  const total = await countPosts();
  console.log(total);
  const currentUrl = req.baseUrl;

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  if (posts.length === 0) {
    return res.status(400).send({ message: "There are no posts yet :(" });
  }

  res.send({
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: posts.map((item)=>({
      id: item._id,
      title:item.title,
      text: item.text,
      banner: item.banner,
      likes: item.likes,
      comments: item.comments,
      name:item.user?.name || "Usuário removido",
      userName:item.user?.username|| "Usuário removido",
      userAvatar:item.user?.avatar|| "Usuário removido"


    }))
});
};
const topPosts = async (req, res) => {
  const posts = await topPostsService();

  if (!posts || posts.length === 0) {
    return res.status(400).send({ message: "There are no posts yet :(" });
  }
  res.send({
      id: item._id,
      title:item.title,
      text: item.text,
      banner: item.banner,
      likes: item.likes,
      comments: item.comments,
      name:item.user?.name || "Usuário removido",
      userName:item.user?.username|| "Usuário removido",
      userAvatar:item.user?.avatar|| "Usuário removido"

  });
    
}
const findById = async (req, res) => {
  const {id}= req.params;

  if(!id) return res.status(400).send({message:"Post id is required"})
  const post = await findByIdService(id);

  if(!post) return res.status(404).send({message:"Post not found"})
  res.send({
      id: post._id,
      title:post.title,
      text: post.text,
      banner: post.banner,
      likes: post.likes,
      comments: post.comments,
      name:post.user?.name || "Usuário removido",
      userName:post.user?.username|| "Usuário removido",
      userAvatar:post.user?.avatar|| "Usuário removido"
  });
}
const searchByTitle = async (req, res) => {
  const {title} = req.query;
  console.log(title)
  const posts = await searchByTitleService(title);
  console.log(posts)

  if(!posts || posts.length === 0) {
    return res.status(400).send({message:"There are no posts with this title"})
  }
  res.send({
  results: posts.map((item)=>({
      id: item._id,
      title:item.title,
      text: item.text,
      banner: item.banner,
      likes: item.likes,
      comments: item.comments,
      name:item.user?.name || "Usuário removido",
      userName:item.user?.username|| "Usuário removido",
      userAvatar:item.user?.avatar|| "Usuário removido"
    })) 
  });
}
const byUser = async (req, res) => {
  const id = req.userId;

  const posts = await byUserService(id);
  

  if(!posts || posts.length === 0) {
    return res.status(400).send({message:"There are no posts from this user"})
  }
 res.send({
  results: posts.map((item)=>({
      id: item._id,
      title:item.title,
      text: item.text,
      banner: item.banner,
      likes: item.likes,
      comments: item.comments,
      name:item.user?.name || "Usuário removido",
      userName:item.user?.username|| "Usuário removido",
      userAvatar:item.user?.avatar|| "Usuário removido"
    })) 
  });
}
const update = async (req, res) => {
  const {id} = req.params;
  const {title, text, banner} = req.body;

   if (!title && !text && !banner) {
      return res.status(400).send({
        message: "Subimit at least one fiend to update the post",
      });
    }
  const post = await findByIdService(id);

  if(!post.user._id.equals(req.userId)) {
    return res.status(401).send({message:"You can only update your own posts"})
  }
  await updateService(id, title, text, banner);
return res.send({message:"Post updated successfully" });
}
const erase = async (req, res) => {
  const {id} = req.params;

  const post = await findByIdService(id);

  if(!post.user._id.equals(req.userId)) {
    return res.status(401).send({message:"You can only delete your own posts"})
  }
  await eraseService(id);
  return res.send({message:"Post deleted successfully" });
}
const likePost = async (req, res) => {
  const {id} = req.params;
  const userId = req.userId;

  const postLiked = await likePostService(id, userId);
  if(!postLiked){
     await deleteLikePostService(id, userId);
     return res.status(200).send({message:"Post unliked successfully"});
  }
  res.send({message:"Post liked successfully"});

}
const addComment = async (req, res) => {
  const {id} = req.params;
  const userId = req.userId;
  const {comment} = req.body;

  if(!comment) return res.status(400).send({message:"Comment text is required"});
  await addCommentService(id, comment, userId);
  res.send({message:"Comment added successfully"});
  
}
const deleteComment = async (req, res) => {
  const {idPost,idComment} = req.params;
  const userId = req.userId;
  
  const commentDeleted = await deleteCommentService(idPost, idComment,userId);
console.log(commentDeleted)
  if (!commentDeleted) {
    return res.status(404).send({ message: "Comment not found or not yours to delete" });
  }
  res.send({message:"Comment deleted successfully"});
  
}
export { create, findAll, topPosts , findById, searchByTitle,byUser,update, erase,likePost , addComment, deleteComment };
