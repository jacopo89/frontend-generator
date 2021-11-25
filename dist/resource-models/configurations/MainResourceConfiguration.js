import TableItem from "./TableItem";
export default class MainResourceConfiguration {
    constructor() {
        this.table = [];
    }
    addTableItem(id, label, viewElement) {
        this.table = [...this.table, new TableItem(id, label, viewElement)];
        return this.table;
    }
    toJson() {
        return {
            [this.getResourceName()]: {
                "table": this.table
            }
        };
    }
}
