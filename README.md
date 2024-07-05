# Real-time Collaborative Document Editor

## Project layout

The project consists of a client app and two small servers:

-   [server/server.ts](./server/server.ts): handles WebSocket communication for the collaborative editor.
-   [server/db-server.ts](./server/db-server.ts): handles api call to persist the document versions history.
-   [editor/](./editor/src/App.tsx): React + TypeScript project consuming both servers.

## Running the project

In order to test the collaborative element from your machine, you will need 3 terminals: one for the servers and the others to launch two instances of the front-end.

### Starting the servers

Open a terminal on the `server/` folder and run `npm start`. This will start both the WebSockets (`locahost:4000`) and the database api (`localhost:5000`).

### Launching two instances of the front-end

1. Open a terminal on the `editor/` folder and run `npm start`.
2. Do the same on a second terminal, and reply 'yes' when prompted if you want to run the app on a different port

### Collaborating

With two instances of the app running, just type in the same document name on both instances to work on the same document.

![alt text](assets/image.png)

You can leave the document and join a different one just going back to the initial pahge and typing in a different document name. If you do the same on the other instance off the app, you'll start collaborating on this new document. You can go back and forth between documents.
