import { Response, Request } from "express";
import Conversation from "../models/conversation.model";
import Message from '@chat/shared/models/conversation.model';
import mongoose from "mongoose";

/**
 * Handles the creation or retrieval of a conversation between two users.
 * If a conversation already exists between the sender (authenticated user) and the receiver (specified by receiverId),
 * it returns that existing conversation. Otherwise, it creates a new conversation with the two users as members.
 *
 * @param req - The request object containing the body with receiverId and the authenticated user's token.
 * @param res - The response object used to send back the HTTP response.
 */
export const createOrGetConversation = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.body;

    const convExists = await Conversation.findOne({
      members: { $all: [req.token?._id, receiverId] },
    });

    if (convExists) return res.json(convExists);

    const conversation = await Conversation.create({
      members: [receiverId, req.token?._id],
      convType: "one-to-one",
      unreadCounts: [
        {
          userId: req.token?._id,
          count: 0,
        },
        {
          userId: receiverId,
          count: 0,
        },
      ],
    });

    return res.json(conversation);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Someting went wrong",
    });
  }
};

/**
 * Retrieves all conversations associated with the user making the request.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} a Promise that resolves to the retrieved conversations
 */
export const getAllConversations = async (req: Request, res: Response) => {
  const pageLimit = req.query.pageLimit
    ? parseInt(req.query.pageLimit as string, 10)
    : 10;
  const page = req.query.page ? parseInt(req.query.page as string, 10) : 0;

  try {
    const conversations = await Conversation.aggregate([
      {
        $match: {
          members: { $in: [new mongoose.Types.ObjectId(req.token?._id)] },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          as: "members",
          pipeline: [
            {
              $match: {
                _id: { $ne: new mongoose.Types.ObjectId(req.token?._id) },
              },
            },
            {
              $project: {
                _id: 1,
                fullName: 1,
                userName: 1,
                imgUrl: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "lastMessage",
          foreignField: "_id",
          as: "lastMessage",
        },
      },
      {
        $unwind: {
          path: "$lastReadMessages",
          preserveNullAndEmptyArrays: true, // to handle documents where lastReadMessages array is empty or missing
        },
      },
      {
        $project: {
          receiver: { $arrayElemAt: ["$members", 0] },
          lastMessage: { $arrayElemAt: ["$lastMessage", 0] },
          messageSequence: 1,
          lastReadMessage : 1
        },
      },
    ]);

    console.log("Conversations", conversations[0]);

    return res.json(conversations);
  } catch (error) {
    console.log("Error", error);

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
      members: req.token?.id,
      admin: req.token?.id,
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

/**
 * Retrieves messages for a conversation and sends them as a JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} a promise that resolves to a JSON response
 */
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const limit =
      req.query.limit && parseInt(req.query.limit as string) < 20
        ? parseInt(req.query.limit as string)
        : 10;
    const offset =
      req.query.offset && parseInt(req.query.offset as string)
        ? parseInt(req.query.offset as string)
        : 0;

    const conversationExist = await Conversation.findOne({
      _id: id,
      members: req.token?._id,
    });

    if (!conversationExist)
      return res.status(404).json({
        success: false,
        message: "Not able to find the Conversation",
      });

    // fetch the messages of conversation
    const messages = await Message.find({ conversationId: id })
      .select("")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    return res.json({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};

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
