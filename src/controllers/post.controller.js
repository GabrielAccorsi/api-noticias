import { createService, findAllService } from "../services/post.service.js";

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
        user: {_id:"67cf429756f8c395fd494968"},
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const findAll = async (req, res) => {
  const posts = await findAllService();
  if (posts.length === 0) {
    return res
      .status(400)
      .send({ message: "There are no posts yet :(" });
  }

  res.send(posts);
};

export { create, findAll };
