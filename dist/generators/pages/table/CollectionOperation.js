export class CollectionOperation {
    constructor({ color, text, icon, onClick, requiresConfirmation }) {
        this.color = color;
        this.text = text;
        this.icon = icon;
        this.onClick = onClick;
        this.requiresConfirmation = requiresConfirmation;
    }
}
