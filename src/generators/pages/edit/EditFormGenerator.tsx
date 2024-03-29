import React, {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {useGetResourceModel} from "../../../resource-models/modelsRegistry";
import {UpdateListings} from "../../../utils/referenceFieldUtils";
import {useEdit} from "../../../redux/actions/verbs/edit";
import {FormGenerator} from "../../forms/FormGenerator";
import {Error as CustomError, Errors} from "../../errors/Errors";
import {Form} from "../../../resource-models/formvalue/Form";
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
    return <ItemActionGenerator
        record={record}
        setRecord={setRecord}
        propResourceName={propResourceName}
        propId={propId}
        propActionName={"patch"}
        refresh={refresh}
        propEditPage={propEditPage}
    />
}
