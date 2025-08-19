import User from "../models/User.js";
export const createUserRepository = (body) => User.create(body);

export const findUserByEmailOrUsername = (email, username) =>
  User.findOne({ $or: [{ email }, { username }] });

export const findAllUserRepository = () => User.find();

export const findByIdUserRepository = (id) => User.findById(id);

export const updateUserRepository  = (
  id,
  name,
  username,
  email,
  avatar,
  background
) => User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, avatar, background }
  );



