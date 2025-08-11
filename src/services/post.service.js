import Post from "../models/Post.js";

const createService = (body) => Post.create(body);

const findAllService = (offset, limit ) => Post.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countPosts = () => Post.countDocuments({});

const topPostsService = () => Post.findOne().sort({ likes: -1 }).limit(3).populate("user");

const findByIdService = (id) => Post.findById(id).populate("user");;



export { createService, findAllService, countPosts, topPostsService, findByIdService };
