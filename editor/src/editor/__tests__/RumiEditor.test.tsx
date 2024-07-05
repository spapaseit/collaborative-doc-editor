import { screen, render, waitFor } from "@testing-library/react";
import { dbclient } from "../../api/db-client";
import RumiEditor from "../RumiEditor";
import { IQuillContext, QuillProvider } from "../QuillContext";
import * as Y from "yjs";

jest.mock("../../api/db-client", () => ({
    dbclient: {
        post: jest.fn()
    }
}));

jest.mock("../../hooks/useUrlParams", () => ({
    useUrlParams: (): { documentName: string; userName: string } => ({
        documentName: "test-document",
        userName: "test-user"
    })
}));

jest.mock("../../types/constants.ts", () => ({
    SAVE_INTERVAL: 500
}));

describe("RumiEditor", () => {
    it("should autosave content periodically", async () => {
        const mockSetProvider = jest.fn();

        // Mock Quill editor instance
        const mockQuill = {
            getContents: jest.fn().mockReturnValue("mocked content"),
            getModule: jest.fn(),
            setContents: jest.fn(),
            enable: jest.fn(),
            on: jest.fn(),
            off: jest.fn()
        };

        const mockContextValue = {
            quillInstance: mockQuill,
            setQuillInstance: jest.fn()
        } as unknown as IQuillContext;

        render(
            <QuillProvider context={mockContextValue}>
                <RumiEditor setProvider={mockSetProvider} />
            </QuillProvider>
        );

        // Wait for the autosave interval
        await waitFor(
            () =>
                expect(dbclient.post).toHaveBeenCalledWith("/saveVersion", {
                    documentName: "test-document",
                    content: "mocked content"
                }),
            { timeout: 3000 }
        );
    });

    it("should undo changes correctly", async () => {
        const mockSetProvider = jest.fn();
        const mockUndo = jest.fn();
        const mockRedo = jest.fn();

        // Mock Quill editor instance
        const mockQuill = {
            getContents: jest.fn().mockReturnValue("mocked content"),
            getModule: jest.fn(),
            setContents: jest.fn(),
            enable: jest.fn(),
            on: jest.fn(),
            off: jest.fn()
        };

        const mockUndoManager = {
            undo: mockUndo,
            redo: mockRedo
        } as Partial<Y.UndoManager> as Y.UndoManager;

        jest.spyOn(Y, "UndoManager").mockImplementation(() => mockUndoManager);

        const mockContextValue = {
            quillInstance: mockQuill,
            setQuillInstance: jest.fn()
        } as unknown as IQuillContext;

        render(
            <QuillProvider context={mockContextValue}>
                <RumiEditor setProvider={mockSetProvider} />
            </QuillProvider>
        );

        // Simulate clicking the Undo button
        screen.getByText("Undo").click();

        // Assert that the undo method was called
        expect(mockUndo).toHaveBeenCalled();
    });
});
