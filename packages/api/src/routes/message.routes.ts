import express from "express";
import {
  getMessages,
  createOrGetConversation,
  getAllConversations,
} from "../controllers/message.controller";

const router = express.Router();

router.get("/", getAllConversations);
router.post("/", createOrGetConversation);
router.get("/:id", getMessages);

export default router;
