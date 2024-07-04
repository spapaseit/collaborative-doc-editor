import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, FormContainer, Input, Title } from "./landing-styles";
//import { useUser } from "../identity";

const JoinDocument: React.FC = () => {
    //const { setUserName, setDocumentName } = useUser();
    const [userName, setUserNameInput] = useState("");
    const [documentName, setDocumentNameInput] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // setUserName(userName);
        // setDocumentName(documentName);

        navigate(`/editor?documentName=${documentName}&userName=${userName}`);
    };

    return (
        <Container>
            <FormContainer>
                <Title>Join a Document</Title>
                <form onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Document name" value={documentName} onChange={e => setDocumentNameInput(e.target.value)} required />
                    <Input type="text" placeholder="UserName" value={userName} onChange={e => setUserNameInput(e.target.value)} required />
                    <Button type="submit">Join</Button>
                </form>
            </FormContainer>
        </Container>
    );
};

export default JoinDocument;
