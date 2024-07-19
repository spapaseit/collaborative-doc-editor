import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Button, EditorContainer, Toolbar } from "./styles";
import { autoSave } from "../api/api-hooks";
import { SAVE_INTERVAL } from "../types";
import { useQuill } from "./QuillContext";

Quill.register("modules/cursors", QuillCursors);

interface Props {
    setProvider: (provider: WebsocketProvider | null) => void;
    //setQuill: (quill: Quill | null) => void;
}

const TextEditor: React.FC<Props> = ({ setProvider }) => {
    const { quillInstance, setQuillInstance } = useQuill();
    const { documentName, userName } = useUrlParams();
    const [undoManager, setUndoManager] = useState<UndoManager | null>(null);
    // TODO: Initialize with most recent version
    const lastSavedContent = useRef<string>("\n");

    const setUp = useCallback((): { provider: WebsocketProvider; binding: QuillBinding; ydoc: Y.Doc } => {
        const ydoc = new Y.Doc();
        const provider = new WebsocketProvider(config.socketUrl, documentName, ydoc);
        setProvider(provider);
        const ytext = ydoc.getText("quill");

        const binding = new QuillBinding(ytext, quillInstance, provider.awareness);

        const undoManager = new UndoManager(ytext, { trackedOrigins: new Set([binding]) });
        setUndoManager(undoManager);

        provider.awareness.setLocalStateField("user", {
            name: userName,
            color: randomHexColor()
        });

        return { provider, binding, ydoc };
    }, [documentName, quillInstance, setProvider, userName]);

    useEffect(() => {
        if (quillInstance == null) {
            return;
        }

        const { provider, binding, ydoc } = setUp();

        quillInstance.enable();

        // Autosave interval
        const autosaveInterval = setInterval(() => {
            const content = quillInstance.getContents();
            const text = quillInstance.getText();

            if (text !== lastSavedContent.current) {
                autoSave(documentName, content);
                lastSavedContent.current = text;
            }
        }, SAVE_INTERVAL);

        return () => {
            clearInterval(autosaveInterval);
            binding.destroy();
            provider.disconnect();
            ydoc.destroy();
            setProvider(null);
        };
    }, [documentName, quillInstance, setProvider, userName, setUp]);

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

    // Makes sure Quill is only initialised once, instead of evey time a new user joins
    const wrapperRef = useCallback(
        (wrapper: HTMLDivElement | null) => {
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
                        ["clean"]
                    ]
                }
            });

            //setQuill(q);
            setQuillInstance(q);
        },
        [setQuillInstance]
    );

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
        </>
    );
};

export default TextEditor;
