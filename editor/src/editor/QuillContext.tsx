import React, { createContext, useContext, useMemo } from "react";
import Quill from "quill";

export interface IQuillContext {
    quillInstance: Quill | null;
    setQuillInstance: React.Dispatch<React.SetStateAction<Quill | null>>;
}

const QuillContext = createContext<IQuillContext | undefined>(undefined);

type Props = { context: IQuillContext; children: React.ReactNode };
export const QuillProvider: React.FC<Props> = ({ context, children }) => {
    const value = useMemo(
        () => ({
            ...context
        }),
        [context]
    );
    return <QuillContext.Provider value={value}>{children}</QuillContext.Provider>;
};

export const useQuill = (): IQuillContext => {
    const context = useContext(QuillContext);
    if (!context) {
        throw new Error("useQuill must be used within a QuillProvider");
    }
    return context;
};
