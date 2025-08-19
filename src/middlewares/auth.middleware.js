import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import {findByIdUserService} from '../services/user.service.js';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send("Authorization header is missing");

    const [scheme, token] = authorization.split(" ");
    if (scheme !== "Bearer" || !token) return res.status(401).send("Invalid authorization format");

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_JWT);
    } catch {
      return res.status(401).send("Invalid Token");
    }

   
    const user = await findByIdUserService(decoded.id);
    if (!user) return res.status(401).send("Invalid Token");

    req.userId = user._id;

    next();

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
