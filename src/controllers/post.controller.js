import { text } from "express";
import {
  createService,
  findAllService,
  countPosts,
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

export { create, findAll };
