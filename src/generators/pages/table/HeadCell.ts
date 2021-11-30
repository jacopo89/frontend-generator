interface HeadCellInterface{
    id: string;
    label: string;
}

export class HeadCell {
    id: string;
    label: string;

    constructor({id, label}:HeadCellInterface) {
        this.id = id;
        this.label = label;
    }
}
