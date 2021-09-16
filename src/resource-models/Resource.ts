
import React from "react";
import {Model} from "./Model";
import {Action} from "./actions/Action";

export interface PropResource{
    model: Model;
    title: string;
    resourceName: string;
    filters: object[];
    createPage: React.FC;
    editPage: React.FC;
    showPage: React.FC;
    table: string[];
    actions: Action[];
}

/**
 * A resource represents
 */
export class Resource{
    actions: Action[];
    title: string;
    resourceName: string;
    filters: object[];
    createPage: React.FC;
    editPage: React.FC;
    showPage: React.FC;
    table: string[];

    constructor({title, resourceName, filters, createPage, editPage, showPage, actions=[], table=[]}:PropResource) {
        this.title = title;
        this.resourceName = resourceName;
        this.filters = filters;
        this.actions = actions.map(action => new Action(action));
        this.createPage = createPage;
        this.editPage = editPage;
        this.showPage = showPage;
        this.table = table;
    }
}
