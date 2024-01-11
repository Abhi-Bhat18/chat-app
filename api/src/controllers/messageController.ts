import { Response, Request } from "express";
import Conversation from "../models/conversationSchema.ts";
import Message from "../models/messageSchema.ts";
import { MessagePayload } from "../types/Message/index.tsx";
/**
 * Handles the creation or retrieval of a conversation between two users.
 * If a conversation already exists between the sender (authenticated user) and the receiver (specified by receiverId),
 * it returns that existing conversation. Otherwise, it creates a new conversation with the two users as members.
 *
 * @param req - The request object containing the body with receiverId and the authenticated user's token.
 * @param res - The response object used to send back the HTTP response.
 */

export const createOrGetConversation = async (
  req: Request,
  res: Response
) => {
  try {

    const { receiverId } = req.body;

    const convExists = await Conversation.findOne({
      members: { $all: [req.token?._id, receiverId] }
    })

    if (convExists)
      return res.json(convExists);

    const conversation = await Conversation.create({
      members: [receiverId, req.token?._id],
      convType: "one-to-one",
      unreadCounts: [{
        userId: req.token?._id,
        count: 0
      },
      {
        userId: receiverId,
        count: 0
      }]
    });

    return res.json(conversation);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Someting went wrong",
    });
  }
};

export const getAllConversation = async (
  req: Request,
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
export const createAGroup = async (req: Request, res: Response) => {
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

// desc -  Join the existing group
// route - /chat/group
// method - POST
// Access - USER
export const joinGroup = async (req: Request, res: Response) => {
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
export const getMessages = async (req: Request, res: Response) => {
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


export const saveMessage = async (message: MessagePayload) => {
  try {

    const conversation = await Conversation.findOne({
      _id: message.conversationId,
    })


  } catch (error) {

    throw error
  }

}
// desc -  Fetch the public groups
// route - /chat
// method - GET
// Access - USER
export const getGroups = async (req: Request, res: Response) => {
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
