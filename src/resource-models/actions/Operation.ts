import {Model} from "../Model";

type OperationType = "item" | "collection";
type Method = "POST" | "GET" | "PATCH" | "PUT";

export interface PropAction{
    model: Model;
    name: string;
    resourceName: string;
    method: Method;
    contentType: string;
    operationType: OperationType;
    responseType?: OperationType;
    path: string | null;
    resource?:string | null;
}

export class Operation{
    model: Model;
    name: string;
    resourceName: string;
    method: Method;
    contentType: string;
    operationType: OperationType
    responseType: OperationType
    path: Path | null;
    resource?:string | null;

    constructor({model, name, resourceName, method, contentType, operationType, path, responseType, resource}:PropAction) {
        this.model = Model.createFromJson(model, resourceName)
        this.name = name;
        this.method = method;
        this.responseType = responseType ?? operationType;
        this.resourceName = resourceName;
        this.contentType = contentType;
        this.operationType = operationType
        this.path = (path) ? new Path(path) :null;
        this.resource = resource
    }

    getModel():Model{
        return this.model;
    }
}

class Path{
    path;
    parameters: string[]

    constructor(path:string) {
        // eslint-disable-next-line no-new-func
        this.path = Path.extractFunction(path);
        this.parameters = Path.extractParameters(path)
    }

    static extractFunction(path:string):()=>{}{

        const regexpDollar = new RegExp("{",'g');
        const regexpBracket = new RegExp("}",'g');
        const found = Array.from(path.matchAll(regexpDollar))
        const found2 = Array.from(path.matchAll(regexpBracket))

        if(found.length !== found2.length){
            throw new Error("Invalid path")
        }

        let parameters: any[] = [];

        for(let i=found.length-1; i>=0; i--){
            // @ts-ignore
            const element=path.substring(found[i].index + 1, found2[i].index)
             parameters = [element, ...parameters];

        }

        const parametersString = parameters.join(",")

        // eslint-disable-next-line no-eval
        return eval("("+parametersString+") => `" + path + "`");
    }


    static extractParameters(path:string):string[]{

        const regexpDollar = new RegExp("\{",'g');
        const regexpBracket = new RegExp("\}",'g');
        const found = Array.from(path.matchAll(regexpDollar))
        const found2 = Array.from(path.matchAll(regexpBracket))

        if(found.length !== found2.length){
            throw new Error("Invalid path")
        }

        let parameters: any[] = [];

        for(let i=found.length-1; i>=0; i--){
            // @ts-ignore
            const element=path.substring(found[i].index + 1, found2[i].index)
            parameters = [element, ...parameters];

        }

        return parameters;
    }
}
