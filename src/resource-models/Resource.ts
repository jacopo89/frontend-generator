
import React from "react";
import {Model} from "./Model";
import {Action} from "./actions/Action";
import {ActionsList} from "./actions/ActionsList";

export interface PropResource{
    model: Model;
    title: string;
    resourceName: string;
    filters: object[];
    createPage: React.FC;
    editPage: React.FC;
    showPage: React.FC;
    table: string[];
    actions: object[]; //TODO CHECK
}

/**
 * A resource represents
 */
export class Resource{
    actions: ActionsList;
    title: string;
    resourceName: string;
    filters: object[];
    createPage: React.FC;
    editPage: React.FC;
    showPage: React.FC;
    table: string[];

    constructor({title, resourceName, filters, createPage, editPage, showPage, actions, table=[]}:PropResource) {
        this.title = title;
        this.resourceName = resourceName;
        this.filters = filters;
        this.actions = new ActionsList( actions.map((action:any) => new Action(action)))
        this.createPage = createPage;
        this.editPage = editPage;
        this.showPage = showPage;
        this.table = table;
    }
}
