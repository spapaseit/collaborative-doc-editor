import React from "react";
import styled from "styled-components";
import Quill from "quill";
import { useFetchVersions } from "../api/api-hooks";
import Delta from "quill-delta";
import { useUrlParams } from "../hooks";

const Container = styled.div`
    padding: 20px;
    background: #f4f4f4;
    border-radius: 50px;
    position: fixed;
    top: 100px;
    right: 20px;
    width: 15vw;
`;

const VersionList = styled.ul`
    list-style: none;
    padding: 0;
`;

const VersionItem = styled.li`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
        background-color: #0056b3;
    }
`;

interface VersionHistoryProps {
    quill: Quill | null;
}

const VersionHistory: React.FC<VersionHistoryProps> = ({ quill }) => {
    const { documentName } = useUrlParams();
    const { data: versions, isPending, isError } = useFetchVersions(documentName);

    const handleRevert = (content: Delta) => {
        if (quill) {
            quill.setContents(content);
        }
    };

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading versions</div>;
    }

    return (
        <Container>
            <h3>Version History</h3>
            <VersionList>
                {versions.map((version: any) => (
                    <VersionItem key={version.version}>
                        <span>Version {version.version}</span>
                        <Button onClick={() => handleRevert(version.content)}>Revert</Button>
                    </VersionItem>
                ))}
            </VersionList>
        </Container>
    );
};

export default VersionHistory;
