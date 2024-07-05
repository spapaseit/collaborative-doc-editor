import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import * as Y from "yjs";
import { UndoManager } from "yjs";
import { QuillBinding } from "y-quill";
import { WebsocketProvider } from "y-websocket";
import QuillCursors from "quill-cursors";
import "quill/dist/quill.bubble.css";
import config from "../config";
import { randomHexColor } from "../utils/color-utils";
import { useUrlParams } from "../hooks";
import { FaUndo, FaRedo } from "react-icons/fa";
import { Button, EditorContainer, Toolbar } from "./EditorStyles";
import { autoSave } from "../api/api-hooks";
import { SAVE_INTERVAL } from "../types";
import VersionHistory from "./VersionHistory";

Quill.register("modules/cursors", QuillCursors);

interface Props {
    setProvider: (provider: WebsocketProvider | null) => void;
}

const RumiEditor: React.FC<Props> = ({ setProvider }) => {
    const [quill, setQuill] = useState<Quill>();
    const { documentName, userName } = useUrlParams();
    const [undoManager, setUndoManager] = useState<UndoManager | null>(null);
    const [lastSavedContent, setLastSavedContent] = useState<string>("");

    // Makes surre Quill is only initialised once, instead of evey time a new user joins
    const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
        if (wrapper == null) {
            return;
        }

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
                    ["undo", "redo"],
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

        const undoManager = new UndoManager(ytext, { trackedOrigins: new Set([binding]) });
        setUndoManager(undoManager);

        provider.awareness.setLocalStateField("user", {
            name: userName,
            color: randomHexColor()
        });

        quill.enable();

        // Autosave interval
        const autosaveInterval = setInterval(() => {
            const content = quill.getContents();

            const currentContent = JSON.stringify(content);

            if (currentContent !== lastSavedContent) {
                autoSave(documentName, content);
                setLastSavedContent(currentContent);
            }
        }, SAVE_INTERVAL);

        return () => {
            clearInterval(autosaveInterval);
            binding.destroy();
            provider.disconnect();
            ydoc.destroy();
            setProvider(null);
        };
    }, [documentName, quill, setProvider, userName, lastSavedContent]);

    const handleUndo = () => {
        if (undoManager) {
            undoManager.undo();
        }
    };

    const handleRedo = () => {
        if (undoManager) {
            undoManager.redo();
        }
    };

    return (
        <>
            <Toolbar>
                <Button onClick={handleUndo}>
                    <FaUndo /> Undo
                </Button>
                <Button onClick={handleRedo}>
                    <FaRedo /> Redo
                </Button>
            </Toolbar>
            <EditorContainer ref={wrapperRef} />
            <VersionHistory documentName={documentName} quill={quill} />
        </>
    );
};

export default RumiEditor;
