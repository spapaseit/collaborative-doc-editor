import Delta from "quill-delta";

export interface IRow {
    id: number;
    documentName: string;
    version: number;
    content: string;
    createdAt: string;
}

export class VersionRow {
    id: number;
    documentName: string;
    version: number;
    content: Delta;
    createdAt: string;

    constructor(id: number, documentName: string, version: number, content: string, createdAt: string) {
        this.id = id;
        this.documentName = documentName;
        this.version = version;
        this.content = new Delta(JSON.parse(content));
        this.createdAt = createdAt;
    }
}
