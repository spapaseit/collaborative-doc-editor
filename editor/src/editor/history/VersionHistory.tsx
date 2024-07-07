import React from "react";
import Quill from "quill";
import { useFetchVersions } from "../../api/api-hooks";
import Delta from "quill-delta";
import { useUrlParams } from "../../hooks";
import { FaHistory } from "react-icons/fa";
import { Button, Container, VersionItem, VersionList } from "./styles";

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
            <h4>Version History</h4>
            <VersionList>
                {versions.map((version: any) => (
                    <VersionItem key={version.version}>
                        <span>Version {version.version}</span>
                        <Button onClick={() => handleRevert(version.content)} title="Revert to this version">
                            <FaHistory />
                        </Button>
                    </VersionItem>
                ))}
            </VersionList>
        </Container>
    );
};

export default VersionHistory;
