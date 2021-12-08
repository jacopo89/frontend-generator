import { Model } from "../Model";
declare type OperationType = "item" | "collection";
declare type Method = "POST" | "GET" | "PATCH" | "PUT";
export interface PropAction {
    model: Model;
    name: string;
    resourceName: string;
    method: Method;
    contentType: string;
    operationType: OperationType;
    responseType?: OperationType;
    path: string | null;
    resource?: string | null;
}
export declare class Operation {
    model: Model;
    name: string;
    resourceName: string;
    method: Method;
    contentType: string;
    operationType: OperationType;
    responseType: OperationType;
    path: Path | null;
    resource?: string | null;
    constructor({ model, name, resourceName, method, contentType, operationType, path, responseType, resource }: PropAction);
    getModel(): Model;
}
declare class Path {
    path: () => string;
    parameters: string[];
    constructor(path: string);
    static extractFunction(path: string): () => string;
    static extractParameters(path: string): string[];
}
export {};
