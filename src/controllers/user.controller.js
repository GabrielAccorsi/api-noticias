import userService from "../services/user.service.js";
import bcrypt from "bcrypt"
const userController = {
  create: async (req, res) => {
    try {
      const { name, username, email, password, avatar, background } = req.body;
      if (!name || !username || !email || !password || !avatar || !background) {
         return res.status(400).send({ messege: "Submit all filds for registration" });
      }

      const user = await userService.createService(req.body);

      if (!user) {
        return res.status(400).send({ message: "Error creating user" });
      }

      return res.status(201).send({
        message: "User created successfuly",
        user: {
          id: user._id,
          name,
          username,
          avatar,
          background,
        },
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  findAll: async (req, res) => {
    try {
      const users = await userService.findAllService();
      if (users.length === 0) {
        return res
          .status(200)
          .send([]);
      }

      return res.send(users().map((item) => ({
        id: item._id,
        name: item.name,
        username: item.username,
        avatar: item.avatar,
        background: item.background,
      })));
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  findById: async (req, res) => {
    try {
      const { user } = req;

       return res.status(201).send({
        user: {
          id: user._id,
          name,
          username,
          avatar,
          background,
        },
      });
    } catch (err) {
     return res.status(500).send({ message: err.message });
    }
  },
  update: async (req, res) => {
    try {
      let { name, username, email, password, avatar, background } = req.body;

      if (!name && !username && !email && !password && !avatar && !background) {
        return res
          .status(400)
          .send({ message: "Submit at least one field for update" });
      }

      const { id } = req;

      const { userId } = req;

      if (userId !== id) {
        return res.status(401).send({ message: "You can only update your own user" });
      }
      
      if (password) {
        password = await bcrypt.hash(password, 10);
      }

      await userService.updateService(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
      );

      return res.send({ message: "User sucessfully updated" });
    } catch (err) {
     return res.status(500).send({ message: err.message });
    }
  },
};

export default userController;
