import React, { Suspense, useState } from "react";
import { TextEditor, DocumentTitle, VersionHistory, QuillProvider } from "./editor";
import { AppContainer, DocumentContainer } from "./app-styles";
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
// const TextEditor = lazy(() => import("./editor/TextEditor"));

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
                                        <QuillProvider context={{ quillInstance: quill, setQuillInstance: setQuill }}>
                                            <TextEditor setProvider={setProvider} />
                                        </QuillProvider>
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
