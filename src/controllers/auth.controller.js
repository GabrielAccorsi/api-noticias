import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email);

    if (!bcrypt.compareSync(password, user.password) || !user)
      return res.status(400).send({ message: "User or password invalid" });

    const token = generateToken(user.id);
    res.send({token});
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export { login };
