import React, { Dispatch, SetStateAction } from "react";
import { Record } from "../../resource-models/Record";
interface EditFormGeneratorProps {
    propResourceName: string;
    propId: number;
    propActionName: string;
    record: Record;
    setRecord: Dispatch<SetStateAction<Record>>;
    propEditPage?: any;
    refresh: () => void;
}
/**
 *
 * @param record
 * @param propId
 * @param propActionName
 * @param propResourceName
 * @param propEditPage
 * @param setRecord
 * @param refresh
 * @constructor
 *
 * This function returns a react component with the edit form. This component is not responsible for fetching previous data.
 */
export declare const ItemActionGenerator: React.FC<EditFormGeneratorProps>;
export {};
