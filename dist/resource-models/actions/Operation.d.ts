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
    path: string | null;
}
export declare class Operation {
    model: Model;
    name: string;
    resourceName: string;
    method: Method;
    contentType: string;
    operationType: OperationType;
    path: Path | null;
    constructor({ model, name, resourceName, method, contentType, operationType, path }: PropAction);
    getModel(): Model;
}
declare class Path {
    path: () => {};
    parameters: string[];
    constructor(path: string);
    static extractFunction(path: string): () => {};
    static extractParameters(path: string): string[];
}
export {};
