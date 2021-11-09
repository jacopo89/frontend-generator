import React from "react";
interface EditFormGeneratorProps {
    propResourceName: string;
    propActionName: string;
    propEditPage?: any;
    refresh: () => void;
    isEdit?: boolean;
}
/**
 *
 * @param propResourceName
 * @param propEditPage
 * @constructor
 *
 * This function returns a react component with the edit form. This component is not responsible for fetching previous data.
 */
export declare const CollectionActionGenerator: React.FC<EditFormGeneratorProps>;
export {};
