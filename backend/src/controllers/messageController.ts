import { Response } from "express";
import { UserAuthInfoRequest } from "../utils/interfaces.ts";

import Conversation from "../models/conversationSchema.ts";
import Message from "../models/messageSchema.ts";

// desc - create a conversation for individual
// route - /chat/group
// method - POST
// Access - USER
export const createConversation = async (
  req: UserAuthInfoRequest,
  res: Response
) => {
  try {
    const { memberId } = req.body;

    // check wether the conversation alreay exsits or not
    const convExsits = await Conversation.find({
      $or: [
        { members: [req.user?.id, memberId] },
        { members: [memberId, req.user?.id] },
      ],
      convType: "INDIVIDUAL",
    });

    if (convExsits) return res.json(convExsits);

    const conv = await Conversation.create({
      members: [memberId, req.user?.id],
      convType: "INDIVIDUAL",
    });

    return res.json(conv);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Someting went wrong",
    });
  }
};

export const getAllConversation = async (
  req: UserAuthInfoRequest,
  res: Response
) => {
  try {
    const conversations = await Conversation.find({
      members: req.user?.id,
    });

    return res.json(conversations);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Someting went wrong",
    });
  }
};

// desc - Create a group chat
// route - /chat/group
// method - POST
// Access - USER
export const createAGroup = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const { groupType, groupName, currentTopic } = req.body;

    const conversation = await Conversation.create({
      members: req.user!.id,
      admin: req.user!.id,
      groupType,
      groupName,
      currentTopic,
    });

    return res.json({
      success: true,
      message: "Group Created succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// desc - create a conversation for individual
// route - /chat/group
// method - POST
// Access - USER
export const saveMessage = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    return res.json({
      success: true,
      message: "Message Saved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};

// desc -  Join the existing group
// route - /chat/group
// method - POST
// Access - USER
export const joinGroup = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const joinGroup = await Conversation.findOneAndUpdate(
      {
        _id: req.body.convId,
        groupType: "PUBLIC",
      },
      {
        $addToSet: {
          members: req.user!.id,
        },
      }
    );

    return res.json({
      success: true,
      message: "Joined the group successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};

// desc -  Fetch the latest 50 messages from the conversaton
// route - /chat/:id
// method - GET
// Access - USER
export const getMessages = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const messages = await Conversation.findById(req.params.id).populate(
      "messages"
    );

    return res.json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};

// desc -  Fetch the public groups
// route - /chat
// method - GET
// Access - USER
export const getGroups = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const groups = await Conversation.find({
      convType: "PUBLIC",
    }).select("_id currentTopic convType groupName");

    return res.json(groups);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};
