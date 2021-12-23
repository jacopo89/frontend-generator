import React from "react";
interface Props {
    propResourceName: string;
    propId: number;
    propEditPage?: any;
}
/**
 * This component is entitled to create a form and populate it with data
 * @param resourceName Resource that we get from the model
 * @param propId which id
 * @param propEditPage custom page
 * @param isEdit
 * @constructor
 */
export declare const EditPage: React.FC<Props>;
export {};
