import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
import userService from '../services/user.service.js';

dotenv.config()

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({
        message: "Authorization header is missing",
      });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.status(401).send({
        message: "Invalid token",
      });
    }

    const [schema, token] = parts;

    if (schema.toLowerCase() !== "bearer") {
      return res.status(401).send({
        message: "Invalid token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_JWT
    );

    const user = await userService.findByIdService(decoded.id);

    if (!user) {
      return res.status(401).send({
        message: "Invalid token",
      });
    }

    req.userId = decoded.id;

    next();

  } catch (err) {
    return res.status(401).send({
      message: "Invalid token",
    });
  }
};