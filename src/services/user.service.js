import {
  createUserRepository,
  findAllUserRepository,
  findByIdUserRepository,
  updateUserRepository,
  findUserByEmailOrUsername,
} from "../repositories/user.repository.js";
import { hashPassword } from "../utils/password.utils.js";
import { generateToken } from "../services/auth.service.js";
import { throwIfExists ,throwIfNotfound} from "../utils/checkExistence.utils.js";

export const createUserService = async (body) => {
  const {
  name,
  username,
  email,
  password,
  avatar,
  background,
} = body
  if (!name || !username || !email || !password || !avatar || !background)
    throw new Error("Submit all fields for registration");

   await throwIfExists(() => findUserByEmailOrUsername(email, username), "Email or username already exists");


  const hashedPassword = await hashPassword(password);

  const user = await createUserRepository({
    name,
    username,
    email,
    password: hashedPassword,
    avatar,
    background,
  });

  if (!user) throw new Error("Error creating user");

  const token = generateToken(user._id);

  return {
    message: "User created successfuly",
    user: {
      id: user._id,
      name,
      username,
      email,
      avatar,
      background,
    },
    token,
  };
};
export const findAllUserService = async () => {
  const users = await throwIfNotfound(() => findAllUserRepository(),"There are no registered users")
  if (users.length === 0) throw new Error("There are no registered users");

  return users;
};
export const findByIdUserService = async (id) => {
  const user = await throwIfNotfound(()=> findByIdUserRepository(id), "User not found");
  return user;
}
export const updateUserService = async (
  { name, username, email, avatar, background },
  userId
) => {
  if (!name && !username && !email && !avatar && !background)
    throw new Error("Submit at least one field for update");
  
  if (email || username) {
    await throwIfExists(
      () => findUserByEmailOrUsername(email, username),
      "Email or username already exists"
    );
  }

  await updateUserRepository(
    userId,
    name,
    username,
    email,
    avatar,
    background
  );

  return { message: "User sucessfully updated" };
};
