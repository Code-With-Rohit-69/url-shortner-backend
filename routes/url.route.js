import { Router } from "express";
import { createShortUrl } from "../controllers/url.controller.js";

const urlRouter = Router();

urlRouter.route("/create").post(createShortUrl)

export default urlRouter;