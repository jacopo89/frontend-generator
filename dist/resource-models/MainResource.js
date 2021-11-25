import { Operation } from "./actions/Operation";
import { OperationsList } from "./actions/OperationsList";
export class MainResource {
    constructor({ title, resourceName, operations, filters = [], table = [] }) {
        this.title = title;
        console.log("title", title);
        this.resourceName = resourceName;
        this.operations = new OperationsList(operations.map((action) => new Operation(action)));
        this.filters = filters;
        this.table = table;
        if (operations === undefined) {
            debugger;
        }
    }
}
