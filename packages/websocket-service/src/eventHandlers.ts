import { wss } from "./socket";
import { WebSocket } from "ws";
import { connections } from "./socket";
import Message from "../models/message.model";
import Conversation from "../models/conversation.model";
import { Request } from "express";

/**
 * Establishes a WebSocket connection for the given user, assigns a unique identifier
 * to the connection, updates the connections registry, and sets up error handling.
 *
 * @param ws - The WebSocket connection instance for the user.
 * @param request - The HTTP request object that initiated the WebSocket connection.
 * @param decodedToken - The decoded JWT token containing the user's information.
 */

export const handleConnection = (
  ws: WebSocket,
  request: Request,
  decodedToken: any
) => {
  // Assigning the unique id(Mongodb Object Id) values to socket
  ws.id = decodedToken._id;
  ws.token = decodedToken;
  // updating the connections
  connections[decodedToken.id] = ws;

  ws.send("Connection successfull"); // only for development purpose
  ws.on("error", onSocketPostError); // handling the error

  ws.on("message", (msg: any, isBinary) => {
    try {
      const { event, data } = JSON.parse(msg.toString());
      switch (event) {
        case "chat":
          ws.emit("chat", data);
          break;
        case "typing":
          break;
      }
    } catch (error) {
      console.log(error);
    }
  });

  ws.on("chat", (payload) => {
    handleChatEvent(ws, payload);
  });

  ws.on("close", () => {
    console.log("connection closed for", ws.id);
    delete connections[ws.id!];
  });
};

// handles the chat event
const handleChatEvent = async (ws: WebSocket, payload: any) => {
  try {
    console.log("token", ws.token);
    // fetch the conversation
    const conversation = await Conversation.findOne({
      _id: payload.conversationId,
      members: ws.token._id,
    });

    if (!conversation)
      return ws.send(
        JSON.stringify({
          success: false,
          message: "Conversation not found",
        })
      );

    // create the message
    const message = await Message.create({
      conversationId: payload.conversationId,
      sentBy: ws.token._id,
      message: payload.message,
      messageSequence: conversation.messageSequence + 1,
    });

    // update the message count
    conversation.messageSequence = message.messageSequence;
    await conversation.save();

    // send the message to the members of the conversation
    conversation.members.forEach((memberId) => {
      if (memberId != ws.token._id) {
        const connection = connections[memberId.toString()] as unknown as
          | WebSocket
          | undefined;

        if (connection && connection.readyState == WebSocket.OPEN) {
          connection.send(
            JSON.stringify({
              event: "chat",
              message: message,
            })
          );
        }
      }
    });

    // send the success message to the user who sent the message
    ws.send(
      JSON.stringify({
        success: true,
        event: "chat",
        message: message,
      })
    );
  } catch (error) {
    console.log("Error", error);
    ws.send(
      JSON.stringify({ success: false, message: "Something went wrong" })
    );
  }
};

// to hanlde before upgradation
function onSocketPreError(err: any) {
  console.error(err);
}

// to handle after upgradation
function onSocketPostError(err: any) {
  console.error(err);
}
