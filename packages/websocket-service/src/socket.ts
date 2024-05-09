import { WebSocketServer } from "ws";
import express from "express";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import connectToMongoDB from "../../api/src/db/mongodb";
import {
  WebSocketConnection,
  WsConnections,
} from "../../api/src/utils/interfaces";
import { UserAuthInfoRequest } from "../../api/src/utils/interfaces";

import { handleConnection } from "./eventHandlers";
import { getToken } from "../../api/src/utils/getToken";
import cookieParser from "cookie-parser";
import { execArgv } from "process";

dotenv.config();

const createServer = async () => {
  await connectToMongoDB(process.env.MONGO_URI!);
  const app = express();
  app.use(cookieParser());
  return app;
};

const app = await createServer();

const server = app.listen(8080, () =>
  console.log("Websocket server is up and running at port 9876")
);

// initializing the web socket server
export const wss = new WebSocketServer({ noServer: true });

// keeping the connections and connections state
export const connections: WsConnections = {};

// Upgrading the http request to ws manually for auth
server.on("upgrade", function upgrade(request, socket, head) {
  socket.on("error", (err) => console.log(err)); // handle the presocket error

  try {
    // if the cookies does not exist
    if (!request.headers.cookie) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    const cookies = request.headers.cookie.split(";");
    const token = getToken(request.headers.cookie); // get the token from the cookie

    // verify the auth token
    const verifiedToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // if the token is not verified destroy the connection
    if (!verifiedToken) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    // upgrade the http connection to ws connection
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request, verifiedToken);
    });
  } catch (error) {
    console.log(error);
    socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
    socket.destroy();
    return;
  }
});

// Handling the WS Connection
wss.on(
  "connection",
  (
    ws: WebSocketConnection,
    request: UserAuthInfoRequest,
    decodedToken: any
  ) => {
    handleConnection(ws, request, decodedToken);
  }
);

wss.on("close", () => {
  // clearInterval(interval);
});
