import React, {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {useGetResourceModel} from "../../../resource-models/modelsRegistry";
import {UpdateListings} from "../../../utils/referenceFieldUtils";
import {useEdit} from "../../../redux/actions/verbs/edit";
import {FormGenerator} from "../../forms/FormGenerator";
import {Error as CustomError, Errors} from "../../errors/Errors";
import {FormValue} from "../../../resource-models/formvalue/FormValue";
import {Record} from "../../../resource-models/Record";
import {ItemActionGenerator} from "../ItemActionGenerator";
import {ItemResponse} from "../../../redux/actions/verbs/ItemResponse";

interface EditFormGeneratorProps {
    propResourceName: string,
    propId: number,
    record: Record,
    setRecord:  Dispatch<SetStateAction<Record>>,
    propEditPage?: any,
    refresh: ()=>void
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
export const EditForm: React.FC<EditFormGeneratorProps> = ({record, setRecord, propId, propResourceName, propEditPage, refresh}) => {
    return <ItemActionGenerator setRecord={setRecord} propResourceName={propResourceName} propId={propId} propActionName={"patch"} record={record} refresh={refresh} propEditPage={propEditPage}/>
}
