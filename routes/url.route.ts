import { Router } from "express";
import {
  createShortUrl,
} from "../controllers/url.controller.ts";

const urlRouter = Router();

urlRouter.route("/create").post(createShortUrl);

export default urlRouter;
