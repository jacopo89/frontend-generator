interface CollectionOperationInterface{
    color:string, text:string, icon?: any, onClick: ()=>{}, requiresConfirmation:boolean
}

export class CollectionOperation {
    color:string;
    text:string;
    icon:any;
    onClick: (selectedIds: number[])=>{};
    requiresConfirmation: boolean

    constructor({color, text, icon,onClick,requiresConfirmation}: CollectionOperationInterface) {
        this.color = color;
        this.text = text;
        this.icon = icon;
        this.onClick = onClick;
        this.requiresConfirmation = requiresConfirmation
    }
}
