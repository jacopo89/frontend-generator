export class ItemOperation {
    constructor({ color, icon, onClick, text, visibility, requiresConfirmation }) {
        this.color = color;
        this.icon = icon;
        this.onClick = onClick;
        this.text = text;
        this.visibility = visibility;
        this.requiresConfirmation = requiresConfirmation;
    }
}
