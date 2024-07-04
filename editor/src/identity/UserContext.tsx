import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface IUserContext {
    userName: string;
    setUserName: (name: string) => void;
    documentName: string;
    setDocumentName: (name: string) => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userName, setUserName] = useState<string>("");
    const [documentName, setDocumentName] = useState<string>("");

    const value = useMemo(
        () => ({
            userName,
            setUserName,
            documentName,
            setDocumentName
        }),
        [userName, documentName]
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): IUserContext => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
