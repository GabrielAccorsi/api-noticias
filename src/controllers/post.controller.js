import { text } from "express";
import {
  createService,
  findAllService,
  countPosts,
  topPostsService,
  findByIdService,
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
export { create, findAll, topPosts , findById};
