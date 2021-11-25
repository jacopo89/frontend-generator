export interface PropertyFieldConfigurationInterface{
    viewElement?: React.DetailedReactHTMLElement<any, any>
    showLabel?: boolean,
    isEdit?: boolean,
    dependencies?: string[]
}

export class PropertyFieldConfiguration{
    viewElement?: React.DetailedReactHTMLElement<any, any>
    showLabel: boolean
    isEdit: boolean
    dependencies:string[]

    constructor({viewElement, showLabel = true, isEdit=true, dependencies=[]}:PropertyFieldConfigurationInterface) {
        this.viewElement = viewElement;
        this.showLabel = showLabel
        this.isEdit = isEdit
        this.dependencies =dependencies
    }
}

