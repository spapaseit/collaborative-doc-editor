import React, { Suspense, useState } from "react";
import { RumiEditor, DocumentTitle, VersionHistory } from "./editor";
import { AppContainer, DocumentContainer } from "./AppStyles";
import { UserPresence } from "./identity";
import { WebsocketProvider } from "y-websocket";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { JoinDocument } from "./landing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Quill from "quill";

const queryClient = new QueryClient();

// For whenever this grows to be a Google Docs competitor
// const JoinDocument = lazy(() => import("./landing/JoinDocument"));
// const UserPresence = lazy(() => import("./identity/UserPresence"));
// const RumiEditor = lazy(() => import("./editor/RumiEditor"));

const App: React.FC = () => {
    const [provider, setProvider] = useState<WebsocketProvider | null>(null);
    const [quill, setQuill] = useState<Quill | null>(null);

    return (
        <QueryClientProvider client={queryClient}>
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
                                        <RumiEditor setProvider={setProvider} setQuill={setQuill} />
                                    </DocumentContainer>
                                    <VersionHistory quill={quill} />
                                </AppContainer>
                            }
                        />
                        <Route path="/" element={<JoinDocument />} />
                    </Routes>
                </Suspense>
            </Router>
        </QueryClientProvider>
    );
};

export default App;
