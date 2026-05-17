import Post from "../models/Post.js";

const createService = (body) => Post.create(body);

const findAllService = (offset, limit) =>
  Post.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countPosts = () => Post.countDocuments({});

const topPostsService = () =>
  Post.find().sort({ likes: -1 }).limit(3).populate("user");

const findByIdService = (id) => Post.findById(id).populate("user");

function searchByTitleService(title) {
  return Post.find({
    title: { $regex: title?.trim(), $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");
}
const byUserService = (id) =>
  Post.find({ user: id }).sort({ _id: -1 }).populate("user");

const updateService = (id, title, text, banner) =>
  Post.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );
const eraseService = (id) => Post.findOneAndDelete({ _id: id });

const likePostService = (idPost, userId) =>
  Post.findOneAndUpdate(
    { _id: idPost, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

const deleteLikePostService = (idPost, userId) =>
  Post.findOneAndUpdate({ _id: idPost }, { $pull: { likes: { userId } } });

const addCommentService = (idPost, comment, userId) => {
  let idComment = Math.floor(Math.random() * Date.now()).toString(36);
  return Post.findOneAndUpdate(
    { _id: idPost },
    {
      $push: {
        comments: { idComment, userId, comment, createdAt: new Date() },
      },
    }
  );
};


export {
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
  addCommentService
};
