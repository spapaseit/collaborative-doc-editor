import React, { Suspense, lazy, useState } from "react";
import { UserProvider } from "./identity";
import { RumiEditor } from "./editor";
import { AppContainer, DocumentContainer } from "./AppStyles";
import { UserPresence } from "./identity";
import { WebsocketProvider } from "y-websocket";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DocumentTitle from "./editor/DocumentTitle";

const JoinDocument = lazy(() => import("./landing/JoinDocument"));

const App: React.FC = () => {
    const [provider, setProvider] = useState<WebsocketProvider | null>(null);

    return (
        <UserProvider>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route
                            path="/editor"
                            element={
                                <AppContainer>
                                    <UserPresence provider={provider} />
                                    <DocumentTitle />
                                    <DocumentContainer>
                                        <RumiEditor setProvider={setProvider} />
                                    </DocumentContainer>
                                </AppContainer>
                            }
                        />
                        <Route path="/" element={<JoinDocument />} />
                    </Routes>
                </Suspense>
            </Router>
        </UserProvider>
    );
};

export default App;
