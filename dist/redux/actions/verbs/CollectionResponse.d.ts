interface CollectionResponseInterface {
    totalItems: number;
    list: any[];
}
export declare class CollectionResponse {
    totalItems: number;
    list: any[];
    constructor({ totalItems, list }: CollectionResponseInterface);
}
export {};
