import swaggerUI from "swagger-ui-express";
import fs from "fs";
import { Router } from "express";
import path from "path";

const routes = Router();
const __dirname = path.resolve();

const swaggerDocs = JSON.parse(
  fs.readFileSync(path.join(__dirname, "src/swagger.json"), "utf8")
);

routes.use("/", swaggerUI.serve);
routes.get("/", swaggerUI.setup(swaggerDocs));

export default routes;
