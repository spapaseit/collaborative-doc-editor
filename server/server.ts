import * as WebSocket from "ws";
import { setupWSConnection } from "y-websocket/bin/utils";
import http from "http";

const port = process.env.PORT || 4000;
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
    const docName = req.url!.slice(1).split("?")[0];
    console.log(`Received a connection for docName: ${docName}`);

    setupWSConnection(ws, req, { docName });
});

server.listen(port, () => {
    console.log(`WebSocket server running on ws://localhost:${port}`);
});
