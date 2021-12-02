import { Operation } from "../../../resource-models/actions/Operation";
export declare function genericError(message: string): {
    type: string;
    message: string;
    severity: string;
};
export declare function genericSuccess(): {
    type: string;
    message: string;
    severity: string;
};
export declare function loadingMessage(resource: string, loading: boolean): {
    type: string;
    resource: string;
    loading: boolean;
};
export declare function success(resource: string, created: boolean): {
    type: string;
    resource: string;
    created: boolean;
};
export declare function useItemOperation(resourceName: string, operation: Operation): {
    data: never[];
    action: (propId: number, values: any) => Promise<any>;
    errors: {};
    loading: boolean;
};
interface CollectionResponseInterface {
    totalItems: number;
    list: any[];
}
declare class CollectionResponse {
    totalItems: number;
    list: any[];
    constructor({ totalItems, list }: CollectionResponseInterface);
}
export declare function useCollectionOperation(resourceName: string, operation: Operation): {
    data: CollectionResponse;
    action: (...values: any[]) => Promise<{
        data: any;
        totalItems: any;
    } | undefined>;
    errors: {};
    loading: boolean;
};
export {};
