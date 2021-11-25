import TableItem from "./TableItem";

export default abstract class PropertyConfiguration{
    table: TableItem[]

    protected constructor() {
        this.table = [];
    }

    protected addTableItem(id:string, label:string, viewElement?:React.DetailedReactHTMLElement<any, any>): TableItem[]{
        this.table = [...this.table, new TableItem(id, label,viewElement) ]
        return this.table;
    }

    protected abstract getResourceName(): string;

    protected toJson(){
        return {
            [this.getResourceName()]: {
                "table":this.table
            }
        }
    }
}
