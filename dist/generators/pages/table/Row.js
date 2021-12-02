export class Row {
    constructor({ id }) {
        if (typeof id == "string") {
            this.id = parseInt(id);
        }
        else {
            this.id = id;
        }
    }
}
