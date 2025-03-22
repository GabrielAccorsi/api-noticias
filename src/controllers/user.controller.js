import userService from "../services/user.service.js";

const userController = {
  create: async (req, res) => {
    try {
      const { name, username, email, password, avatar, background } = req.body;
      if (!name || !username || !email || !password || !avatar || !background) {
        res.status(400).send({ messege: "Submit all filds for registration" });
      }

      const user = await userService.createService(req.body);

      if (!user) {
        return res.status(400).send({ message: "Error creating user" });
      }

      res.status(201).send({
        message: "User created successfuly",
        user: {
          id: user._id,
          name,
          username,
          email,
          avatar,
          background,
        },
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
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
  },
  findById: async (req, res) => {
    try {
      const { user } = req;

      res.send(user);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { name, username, email, password, avatar, background } = req.body;

      if (!name && !username && !email && !password && !avatar && !background) {
        res
          .status(400)
          .send({ messege: "Submit at least one field for update" });
      }

      const { id, user } = req;

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
  },
};

export default userController;
