import { Model } from "../Model";
export class Operation {
    constructor({ model, name, resourceName, method, contentType, operationType, path, responseType, resource }) {
        this.model = Model.createFromJson(model, resourceName);
        this.name = name;
        this.method = method;
        this.responseType = responseType !== null && responseType !== void 0 ? responseType : operationType;
        this.resourceName = resourceName;
        this.contentType = contentType;
        this.operationType = operationType;
        this.path = (path) ? new Path(path) : null;
        this.resource = resource;
    }
    getModel() {
        return this.model;
    }
}
class Path {
    constructor(path) {
        // eslint-disable-next-line no-new-func
        this.path = Path.extractFunction(path);
        this.parameters = Path.extractParameters(path);
    }
    static extractFunction(path) {
        const regexpDollar = new RegExp("{", 'g');
        const regexpBracket = new RegExp("}", 'g');
        const found = Array.from(path.matchAll(regexpDollar));
        const found2 = Array.from(path.matchAll(regexpBracket));
        if (found.length !== found2.length) {
            throw new Error("Invalid path");
        }
        let parameters = [];
        for (let i = found.length - 1; i >= 0; i--) {
            // @ts-ignore
            const element = path.substring(found[i].index + 1, found2[i].index);
            parameters = [element, ...parameters];
        }
        const parametersString = parameters.join(",");
        // eslint-disable-next-line no-eval
        return eval("(" + parametersString + ") => `" + path + "`");
    }
    static extractParameters(path) {
        const regexpDollar = new RegExp("\{", 'g');
        const regexpBracket = new RegExp("\}", 'g');
        const found = Array.from(path.matchAll(regexpDollar));
        const found2 = Array.from(path.matchAll(regexpBracket));
        if (found.length !== found2.length) {
            throw new Error("Invalid path");
        }
        let parameters = [];
        for (let i = found.length - 1; i >= 0; i--) {
            // @ts-ignore
            const element = path.substring(found[i].index + 1, found2[i].index);
            parameters = [element, ...parameters];
        }
        return parameters;
    }
}
