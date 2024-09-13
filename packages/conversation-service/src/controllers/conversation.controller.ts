import { Request, Response } from "express";
import axios from "axios";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

import { ApiError, ApiResponse, asyncHandler } from "@chat/shared";

export const createConversation = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.body;

    // check wether the conversation already exists or not

    const conversationExist = await Conversation.findOne({
      members: {
        $all: [{ userId: userId }, { userId: "" }],
      },
    });

    if (conversationExist)
      throw new ApiError(409, "Conversation already exists");

    // do ther http request to the user service to fetch the user details
    const userExist = await axios.get("http://localhost:900/user/:id", {
      headers: {
        "x-api-key": process.env.USER_SERVICE_API_KEY,
      },
    });

    // if not throw an error
    if (!userExist) throw new ApiError(400, "User does not exists");

    // create the conversation with the participants details

    const conversation = await Conversation.create({});

    return res
      .status(201)
      .json(
        new ApiResponse(201, conversation, "Conversation created successfully")
      );
  }
);

export const createMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const { message } = req.body;

    // check wether the conversation exists or not
    const conversation = await Conversation.findById(id);

    if (!conversation) throw new ApiError(404, "Conversation does not exists");

    // check wether the user exists in the conversation
  }
);

export const getConversations = asyncHandler(
  async (req: Request, res: Response) => {
    // get conversation from the redis

    const conversations = await Conversation.find({
      // 'members.userId' : req.token.id
    });

    if (!conversations && conversations.length == 0) {
    }

    return res.json(
      new ApiResponse(200, conversations, "Conversations fetched successfully")
    );
  }
);

export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

  const messages = await Message.find({
    conversationId: id,
  })
    .skip(offset)
    .limit(limit);

  if (!messages) throw new ApiError(404, "Unable to find the conversations");
  return res.json(
    new ApiResponse(200, messages, "Messages fetched successfully")
  );
});

