import { Express } from "express-serve-static-core";
import {WebSocket} from "ws";

declare module 'express-serve-static-core'{
  export interface Request {
    token?: { 
      id : string,
      email : string,
      iat : number,
      exp : number
    }
  }
}

declare module "ws" {
  export interface WebSocket {
    id?: string;
    isAlive?: boolean;
    token?: any; //JWT Payload
  }
}
