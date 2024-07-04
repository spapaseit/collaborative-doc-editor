import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
import { WebsocketProvider } from "y-websocket";
import QuillCursors from "quill-cursors";
import "quill/dist/quill.bubble.css";
import config from "../config";
import { styled } from "styled-components";
import { randomHexColor } from "../utils/color-utils";
import { useLocation } from "react-router-dom";
import { useUrlParams } from "../hooks";

Quill.register("modules/cursors", QuillCursors);

const EditorContainer = styled.div`
    height: 90%;
    border: none;
    .ql-editor {
        height: 100%;
        overflow-y: auto;
        border: none;
    }

    .ql-container {
        overflow: visible;
        // font-family: Georgia, serif;
        // font-size: 16px;

        .ql-snow {
            border: none;
            display: flex;
            justify-content: center;
        }
    }
`;

interface Props {
    setProvider: (provider: WebsocketProvider | null) => void;
}

const RumiEditor: React.FC<Props> = ({ setProvider }) => {
    const [quill, setQuill] = useState<Quill>();
    // const location = useLocation();
    // const params = new URLSearchParams(location.search);
    // const userName = params.get("userName") || "Anonymous";
    // const documentName = params.get("documentName") || "default-room";

    const { documentName, userName } = useUrlParams();

    const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
        if (wrapper == null) return;

        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);

        const q = new Quill(editor, {
            theme: "bubble",
            modules: {
                cursors: true,
                toolbar: [
                    [{ font: ["sans-serif", "serif", "monospace"] }],
                    [{ size: ["small", false, "large", "huge"] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block"],
                    ["clean"]
                ]
            }
        });

        setQuill(q);
    }, []);

    useEffect(() => {
        if (quill == null) {
            return;
        }

        const ydoc = new Y.Doc();
        const provider = new WebsocketProvider(config.socketUrl, documentName, ydoc);
        setProvider(provider);
        const ytext = ydoc.getText("quill");

        const binding = new QuillBinding(ytext, quill, provider.awareness);

        provider.awareness.setLocalStateField("user", {
            name: userName,
            color: randomHexColor()
        });

        quill.enable();

        return () => {
            binding.destroy();
            provider.disconnect();
            ydoc.destroy();
        };
    }, [documentName, quill, setProvider, userName]);

    return <EditorContainer ref={wrapperRef} />;
};

export default RumiEditor;
