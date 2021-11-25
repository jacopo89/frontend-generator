export class PropertyFieldConfiguration {
    constructor({ viewElement, showLabel = true, isEdit = true, dependencies = [] }) {
        this.viewElement = viewElement;
        this.showLabel = showLabel;
        this.isEdit = isEdit;
        this.dependencies = dependencies;
    }
}
