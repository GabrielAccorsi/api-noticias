import { createUserService, 
  findAllUserService,
  findByIdUserService,
  updateUserService
} from "../services/user.service.js";

 export const createUserController = async (req, res) => {
  const { body } = req;
    try {
      const user = await createUserService(body);

      res.status(201).send(user);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
  findAll: async (req, res) => {
    try {
      const users = await userService.findAllService();
      if (users.length === 0) {
        return res
          .status(400)
          .send({ message: "There are no registered users" });
      }

      res.send(users);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
  findById: async (req, res) => {
    try {
      const { user } = req;

      res.send(user);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
  update: async (req, res) => {
    try {
      const { name, username, email, password, avatar, background } = req.body;

      if (!name && !username && !email && !password && !avatar && !background) {
        res
          .status(400)
          .send({ messege: "Submit at least one field for update" });
      }

      const { id } = req;

      await userService.updateService(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
      );

      res.send({ message: "User sucessfully updated" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }


export default userController;
