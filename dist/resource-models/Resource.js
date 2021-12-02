import { Model } from "./Model";
/**
 * A resource represents
 */
export class Resource {
    constructor({ title, model, resourceName, filters, createPage, editPage, showPage, table = [] }) {
        this.title = title;
        this.resourceName = resourceName;
        this.filters = filters;
        this.createPage = createPage;
        this.editPage = editPage;
        this.showPage = showPage;
        this.table = table;
        this.model = Model.createFromJson(model, resourceName);
    }
    getModel() {
        return this.model;
    }
}
