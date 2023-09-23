import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { WebSocketConnection, WsConnections } from "./utils/interfaces";

import { createClient } from "redis";
import { UserAuthInfoRequest } from "./utils/interfaces";

dotenv.config();
const client = createClient();

client
  .connect()
  .then(() => console.log("Redis connected"))
  .catch((err) => console.log("Redis connection error"));

const app = express();
const server = app.listen(9876);
app.use(cookieParser());

// initializing the web socket server
const wss = new WebSocketServer({ noServer: true });
console.log("Web socket server is on");

// keeping the clients and connections state
const clients: string[] = [];
const connections: WsConnections = {};
const groups  = {}

// Upgrading the http request to ws manually
server.on("upgrade", function upgrade(request, socket, head) {
  socket.on("error", onSocketPreError); // handle the presocket error

  try {
    const token = request.headers.cookie;
    const verify = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // if the token is not verified
    if (!verify) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    // upgrade the http connection to ws connection
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request, verify.id);
    });
  } catch (error) {
    socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
    socket.destroy();
    return;
  }
});

// Handling the WS Connection
wss.on(
  "connection",
  (ws: WebSocketConnection, request: UserAuthInfoRequest, id: string) => {
    // Assigning the required values to socket
    ws.id = id;

    // updating the connections
    connections[id] = ws;

    // ws.send("Connection successfull", id); // only for development purpose
    ws.on("error", onSocketPostError); // handling the error

    ws.on("message", (msg: any, isBinary) => {
      const data = JSON.parse(msg);
      const messageType = data.messageType;

      const conversationId = data.conversationId;

      try {
        // sending to the connection if the receiver existed
        if (connections.hasOwnProperty(data.receiverId)) {
          const connection = connections[data.receiverId];
          connection.send(msg, { binary: false });
        }
      } catch (error) {
        console.log(error);
      }
    });

    ws.on("close", () => {
      // removing ws connectoins from the connections and clients
      clients.splice(clients.indexOf(ws.id!), 1);
      delete connections[ws.id!];
      console.log("connection id ", ws.id);
    });
  }
);

wss.on("close", () => {
  //   clearInterval(interval);
});

// Group Messaging
// find the members in the conversation and cache it in the redis

// to hanlde before upgradation
function onSocketPreError(err: any) {
  console.error(err);
}

// to handle after upgradation
function onSocketPostError(err: any) {
  console.error(err);
}
