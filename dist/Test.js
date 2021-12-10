import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useSetResourceModel } from "./resource-models/modelsRegistry";
import { createServer } from "miragejs";
import { properties } from "./mock/properties";
import { listings } from "./mock/listings";
import { modelwop } from "./mock/model";
import { landlords } from "./mock/landlords";
import { propertyShow } from "./mock/propertyShow";
import { units } from "./mock/units";
import { landlordRelationship } from "./mock/landlordRelationship";
import { landlord } from "./mock/landlord";
import { tenancies } from "./mock/tenancies";
import { Create } from "./generators/pages/CreatePageGenerator";
export default function Test() {
    createServer({
        routes() {
            this.get("http://localhost:1000/api/properties/1", () => propertyShow);
            this.get("http://localhost:1000/api/properties", () => properties);
            this.get("http://localhost:1000/api/landlords", () => landlords);
            this.get("http://localhost:1000/api/landlord_relationships/1", () => landlordRelationship);
            this.post("http://localhost:1000/api/resources/listings", () => listings);
            this.get("http://localhost:1000/resources", () => modelwop);
            this.get("http://localhost:1000/api/units", () => units);
            this.get("http://localhost:1000/api/landlords/1", () => landlord);
            this.get("http://localhost:1000/api/landlord_relationships", () => tenancies);
        },
    });
    const modelLoaded = useSetResourceModel({}, "http://localhost:1000/resources");
    const render = _jsx("div", { children: _jsx(Create, { propResourceName: "users", propCreatePage: _jsx(CreatePage, {}, void 0) }, void 0) }, void 0);
    return modelLoaded ? _jsx("div", Object.assign({ style: { padding: 30 } }, { children: render }), void 0) : _jsx("div", {}, void 0);
}
function CreatePage(props) {
    const { model } = props;
    return _jsx(_Fragment, { children: _jsx("div", { children: model.getInputField("roles", props) }, void 0) }, void 0);
}
