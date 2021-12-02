export class FilterComponent {
    constructor({ type, name, component, isOrder = false }) {
        this.type = type;
        this.name = name;
        this.isOrder = isOrder;
        this.component = component;
    }
}
