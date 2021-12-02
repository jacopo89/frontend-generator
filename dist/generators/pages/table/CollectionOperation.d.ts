interface CollectionOperationInterface {
    color: string;
    text: string;
    icon?: any;
    onClick: () => {};
    requiresConfirmation: boolean;
}
export declare class CollectionOperation {
    color: string;
    text: string;
    icon: any;
    onClick: (selectedIds: number[]) => {};
    requiresConfirmation: boolean;
    constructor({ color, text, icon, onClick, requiresConfirmation }: CollectionOperationInterface);
}
export {};
