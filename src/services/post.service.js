import Post from "../models/Post.js";

const createService = (body) => Post.create(body);

const findAllService = (offset, limit ) => Post.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countPosts = () => Post.countDocuments({});



export { createService, findAllService, countPosts };
