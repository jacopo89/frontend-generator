import {Action} from "./Action";

export class ActionsList{
    actions;
    constructor(actions: Action[]) {
        this.actions = actions
    }

    getActionByName(name:string){
        return this.actions.find(action => action.name === name)
    }
}
