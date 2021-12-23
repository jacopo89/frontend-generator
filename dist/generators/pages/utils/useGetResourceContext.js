import { useGetResourceModel } from "../../../resource-models/modelsRegistry";
import { useResource } from "../../hooks/resourceUtils";
export function useGetResourceContext({ propResourceName, propId }) {
    const { operations } = useGetResourceModel(propResourceName);
    const operation = operations.findItemOperationByName("get");
    return useResource(propResourceName, propId, operation);
}
