import { Request } from "express";
import WebSocket from "ws";

export interface User {
  id: string;
  email: string;
}
export interface UserAuthInfoRequest extends Request {
  user ?: User; // or any other type
}

export interface WebSocketConnection extends WebSocket {
  id?: string;
  isAlive?: boolean;
  conversationId?: string;
}

export interface WsConnections {
  [id: string]: WebSocketConnection;
}
