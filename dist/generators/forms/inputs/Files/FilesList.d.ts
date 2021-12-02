import React from "react";
import { PropertyModel } from "../../../../resource-models/PropertyModel";
interface FilesGridInterface {
    modelResourceName: string;
    files: Map<number, FileInterface>;
    resourceId: string;
    id: string;
    model: PropertyModel;
    refresh: () => {};
    partialSubmitHandler: () => {};
    onChange: (vars: any) => void;
}
interface FileInterface {
    id: number;
    filename: string;
    subDir: string;
    path: string;
    url: string;
}
export declare const FilesList: React.FC<FilesGridInterface>;
export {};
