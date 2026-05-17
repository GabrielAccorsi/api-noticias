import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email);

    if (!user) return res.status(400).send({ message: "User or password invalid" });

    if (!bcrypt.compareSync(password, user.password) || !user)
      return res.status(400).send({ message: "User or password invalid" });

    const token = generateToken(user.id);
    return res.send({
      message: "Login successful",
      data: { token },
    });
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
export { login };
