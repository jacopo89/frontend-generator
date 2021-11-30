interface RowInterface {
    id:string|number;
}

export class Row{
    id:number;

    constructor({id}:RowInterface) {
        if(typeof id =="string"){
            this.id = parseInt(id);
        }else{
            this.id = id;
        }
    }
}
