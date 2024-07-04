import { useLocation } from "react-router-dom";

export const useUrlParams = (): { documentName: string; userName: string } => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const documentName = params.get("documentName") || "new-document";
    const userName = params.get("userName") || "Anonymous";

    return { documentName, userName };
};
