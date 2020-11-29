import express from "express";
import { getPosts } from "../controllers/postController.js";

import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getPosts);
export default router;
