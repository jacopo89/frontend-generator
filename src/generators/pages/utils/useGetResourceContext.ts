import {useGetResourceModel} from "../../../resource-models/modelsRegistry";
import {useResource} from "../../hooks/resourceUtils";

interface ResourceContext{
    propResourceName:string,
    propId: number
}

export function useGetResourceContext({propResourceName,propId}:ResourceContext){
    const {operations} = useGetResourceModel(propResourceName);
    const operation = operations.findItemOperationByName("get");
    return useResource(propResourceName, propId, operation);
}
