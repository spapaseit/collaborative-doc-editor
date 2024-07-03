import React from "react";
import { UserNameInput, UserProvider } from "./identity";
import { RumiEditor } from "./editor";
import { AppContainer, DocumentContainer } from "./AppStyles";

const App: React.FC = () => (
    <UserProvider>
        <AppContainer>
            <h1>Collaborative Document Editor</h1>
            <UserNameInput />
            <DocumentContainer>
                <RumiEditor />
            </DocumentContainer>
        </AppContainer>
    </UserProvider>
);

export default App;
