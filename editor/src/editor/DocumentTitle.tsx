import { useUrlParams } from "../hooks";

const DocumentTitle = () => {
    const { documentName } = useUrlParams();

    return <h1>{documentName}</h1>;
};

export default DocumentTitle;
