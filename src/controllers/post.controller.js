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

    return res.status(201).send({ message: "Post created successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 5;

    const posts = await findAllService(offset, limit);
    const total = await countPosts();
    console.log(total);
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (posts.length === 0) {
      return res.status(400).send({ message: "There are no posts yet :(" });
    }

    return res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: posts.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user?.name || "Usuário removido",
        userName: item.user?.username || "Usuário removido",
        userAvatar: item.user?.avatar || "Usuário removido",
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const topPosts = async (req, res) => {
  try {
    const posts = await topPostsService();

    if (!posts || posts.length === 0) {
      return res.status(400).send({ message: "There are no posts yet :(" });
    }
    return res.send({
      results: posts.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user?.name || "Usuário removido",
        userName: item.user?.username || "Usuário removido",
        userAvatar: item.user?.avatar || "Usuário removido",
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const findById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send({ message: "Post id is required" });
    const post = await findByIdService(id);

    if (!post) return res.status(404).send({ message: "Post not found" });
    return res.send({
      id: post._id,
      title: post.title,
      text: post.text,
      banner: post.banner,
      likes: post.likes,
      comments: post.comments,
      name: post.user?.name || "Usuário removido",
      userName: post.user?.username || "Usuário removido",
      userAvatar: post.user?.avatar || "Usuário removido",
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).send({
        message: "Title query is required",
      });
    }
    const posts = await searchByTitleService(title);

    if (!posts || posts.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no posts with this title" });
    }
    return res.send({
      results: posts.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user?.name || "Usuário removido",
        userName: item.user?.username || "Usuário removido",
        userAvatar: item.user?.avatar || "Usuário removido",
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const byUser = async (req, res) => {
  try {
    const id = req.userId;

    const posts = await byUserService(id);

    if (!posts || posts.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no posts from this user" });
    }
    return res.send({
      results: posts.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user?.name || "Usuário removido",
        userName: item.user?.username || "Usuário removido",
        userAvatar: item.user?.avatar || "Usuário removido",
      })),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, banner } = req.body;

    if (!title && !text && !banner) {
      return res.status(400).send({
        message: "Subimit at least one fiend to update the post",
      });
    }
    const post = await findByIdService(id);

    if (!post) return res.status(404).send({ message: "Post not found" });

    if (!post.user || !post.user._id.equals(req.userId)) {
      return res
        .status(401)
        .send({ message: "You can only update your own posts" });
    }
    await updateService(id, title, text, banner);
    return res.send({ message: "Post updated successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const erase = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await findByIdService(id);

    if (!post) return res.status(404).send({ message: "Post not found" });

    if (!post.user || !post.user._id.equals(req.userId)) {
      return res
        .status(401)
        .send({ message: "You can only delete your own posts" });
    }
    await eraseService(id);
    return res.send({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const post = await findByIdService(id);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    const postLiked = await likePostService(id, userId);

    if (!postLiked) {
      await deleteLikePostService(id, userId);
      return res.status(200).send({ message: "Post unliked successfully" });
    }

    return res.send({ message: "Post liked successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment)
      return res.status(400).send({ message: "Comment text is required" });

    const commentAdded = await addCommentService(id, comment, userId);

    if (!commentAdded) {
      return res.status(404).send({ message: "Post not found" });
    }

    return res.send({ message: "Comment added successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export {
  create,
  findAll,
  topPosts,
  findById,
  searchByTitle,
  byUser,
  update,
  erase,
  likePost,
  addComment,
};
