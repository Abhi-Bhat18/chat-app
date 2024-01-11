import { wss } from "../socket";
import { connections } from "../socket";

import { WebSocketConnection, WsConnections } from "../utils/interfaces";
import { Request } from "express";


/**
 * Establishes a WebSocket connection for the given user, assigns a unique identifier
 * to the connection, updates the connections registry, and sets up error handling.
 *
 * @param ws - The WebSocket connection instance for the user.
 * @param request - The HTTP request object that initiated the WebSocket connection.
 * @param decodedToken - The decoded JWT token containing the user's information.
 */

export const handleConnection = (ws: WebSocketConnection, request: Request, decodedToken: any) => {

    // Assigning the unique id(Mongodb Object Id) values to socket
    ws.id = decodedToken.id;

    // updating the connections
    connections[decodedToken.id] = ws;

    ws.send("Connection successfull"); // only for development purpose
    ws.on("error", onSocketPostError); // handling the error

    ws.on("message", (msg: any, isBinary) => {
        try {

            const { event, payload } = JSON.parse(msg);

            console.log('Event', event);
            console.log("Payload", payload);

            if(event === 'chat') {
                ws.emit('chat', payload);
            }
        } catch (error) {
            console.log(error);
        }
    });

    ws.on('chat', (payload) => {
        console.log("Payload", payload);
        ws.send("Message sent successfully");
    })

    ws.on("close", () => {
        delete connections[ws.id!];
        console.log("connection id ", ws.id);
    });

}


const handleMessage = () => {


}
// to hanlde before upgradation
function onSocketPreError(err: any) {
    console.error(err);
}

// to handle after upgradation
function onSocketPostError(err: any) {
    console.error(err);
}
