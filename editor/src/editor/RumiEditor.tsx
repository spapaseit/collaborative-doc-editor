import React, { useEffect, useRef } from "react";
import Quill from "quill";
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
import { WebsocketProvider } from "y-websocket";
import QuillCursors from "quill-cursors";
import "quill/dist/quill.bubble.css";
import { useUser } from "../identity";
import config from "../config";
import { styled } from "styled-components";
// import "./Editor.css";

Quill.register("modules/cursors", QuillCursors);

const EditorContainer = styled.div`
    height: 90%;
    border: none;
    .ql-editor {
        height: 100%;
        overflow-y: auto;
        border: none;
    }

    .ql-container .ql-snow {
        border: none;
        display: flex;
        justify-content: center;
    }
`;

const RumiEditor: React.FC = () => {
    const quillRef = useRef<HTMLDivElement>(null);
    const { userName } = useUser();

    useEffect(() => {
        const ydoc = new Y.Doc();
        const provider = new WebsocketProvider(config.socketUrl, "rumi-collab-doc", ydoc);
        const ytext = ydoc.getText("quill");

        if (quillRef.current) {
            const quill = new Quill(quillRef.current, {
                theme: "bubble",
                modules: {
                    cursors: true
                }
            });

            new QuillBinding(ytext, quill, provider.awareness);

            provider.awareness.setLocalStateField("user", {
                name: userName || "Anonymous"
            });

            return () => {
                provider.disconnect();
            };
        }
    }, [userName]);

    return <EditorContainer ref={quillRef} />;
};

export default RumiEditor;
