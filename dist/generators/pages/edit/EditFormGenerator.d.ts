import React, { Dispatch, SetStateAction } from "react";
import { Record } from "../../../resource-models/Record";
interface EditFormGeneratorProps {
    propResourceName: string;
    propId: number;
    record: Record;
    setRecord: Dispatch<SetStateAction<Record>>;
    propEditPage?: any;
    refresh: () => void;
}
/**
 *
 * @param record
 * @param setRecord
 * @param propId
 * @param propResourceName
 * @param propEditPage
 * @param refresh
 * @param isEdit
 * @constructor
 *
 * This function returns a react component with the edit form. This component is not responsible for fetching previous data.
 */
export declare const EditForm: React.FC<EditFormGeneratorProps>;
export {};
