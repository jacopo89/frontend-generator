import { Row } from "./Row";
interface ItemOperationInterface {
    color: string;
    icon: any;
    onClick: (row: Row) => void;
    text: string;
    visibility: (row: Row) => boolean;
    requiresConfirmation: boolean;
}
export declare class ItemOperation {
    color: string;
    icon: any;
    onClick: (row: Row) => void;
    text: string;
    visibility: (row: Row) => boolean;
    requiresConfirmation: boolean;
    constructor({ color, icon, onClick, text, visibility, requiresConfirmation }: ItemOperationInterface);
}
export {};
