import {Row} from "./Row";

interface ItemOperationInterface {
    color:string;
    icon: any;
    onClick: (row:Row) =>void
    text:string,
    visibility:(row:Row)=>boolean,
    requiresConfirmation:boolean
}

export class ItemOperation {
    color:string;
    icon: any;
    onClick: (row:Row) =>void
    text:string;
    visibility:(row:Row)=>boolean;
    requiresConfirmation:boolean

    constructor({color, icon, onClick,text, visibility, requiresConfirmation}:ItemOperationInterface) {
        this.color = color;
        this.icon = icon;
        this.onClick = onClick
        this.text = text
        this.visibility = visibility
        this.requiresConfirmation= requiresConfirmation
    }
}
