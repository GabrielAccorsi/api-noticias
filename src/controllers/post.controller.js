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
        id:"objectidfake1",
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const findAll = async (req, res) => {
  const post = [];
  res.send(post);
};

export { create, findAll };
