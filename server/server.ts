import * as WebSocket from "ws";
// import * as Y from "yjs";
// import * as yw from "y-websocket";
import { setupWSConnection } from "y-websocket/bin/utils";
//import http from "http";

const wss = new WebSocket.Server({ port: 4000 });

wss.on("connection", setupWSConnection);
console.log("WebSocket server running on ws://localhost:4000");

// wss.on("connection", (ws: WebSocket) => {
//     const doc = new Y.Doc();
//     setupWSConnection(ws, doc);
// });

// console.log("WebSocket server running on ws://localhost:1234");

// const wss = new WebSocket.Server({ noServer: true });

// const host = process.env.HOST || "localhost";
// const port = Number.parseInt(process.env.PORT || "1234");

// const server = http.createServer((_request, response) => {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end("okay");
// });

// wss.on("connection", setupWSConnection);

// server.on("upgrade", (request, socket, head) => {
//     // You may check auth of request here..
//     // Call `wss.HandleUpgrade` *after* you checked whether the client has access
//     // (e.g. by checking cookies, or url parameters).
//     // See https://github.com/websockets/ws#client-authentication
//     wss.handleUpgrade(
//         request,
//         socket,
//         head,
//         /** @param {any} ws */ ws => {
//             wss.emit("connection", ws, request);
//         }
//     );
// });

// server.listen(port, host, () => {
//     console.log(`running at '${host}' on port ${port}`);
// });
