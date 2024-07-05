import { FETCH_VERSION_HISTORY_INTERVAL, VersionRow } from "./../types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { dbclient } from "./db-client";
import Delta from "quill-delta";
import { IRow } from "../types/version-row";

export const useFetchVersions = (documentName: string): UseQueryResult<VersionRow[], Error> => {
    return useQuery({
        queryKey: ["versions", documentName],
        queryFn: async () => {
            const { data } = await dbclient.get(`/versions/${documentName}`);
            return Array.from(data, (x: IRow) => new VersionRow(x.id, x.documentName, x.version, x.content, x.createdAt));
        },
        refetchInterval: FETCH_VERSION_HISTORY_INTERVAL
    });
};

export const autoSave = async (documentName: string, content: Delta) => {
    await dbclient.post("/saveVersion", { documentName, content });
};
