
interface CollectionResponseInterface {
    totalItems: number;
    list: any[]
}

export class CollectionResponse {
    totalItems: number;
    list: any[]

    constructor({ totalItems, list }:CollectionResponseInterface) {
        this.totalItems= totalItems
        this.list = list
    }
}
