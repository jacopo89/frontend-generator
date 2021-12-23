/// <reference types="react" />
import { Operation } from "../../resource-models/actions/Operation";
import { Record } from "../../resource-models/Record";
export declare function useResource(resourceName: string, propId: number, operation: Operation): {
    record: Record;
    setRecord: import("react").Dispatch<import("react").SetStateAction<Record>>;
    getResource: () => Promise<import("../../redux/actions/verbs/CollectionResponse").CollectionResponse | import("../../redux/actions/verbs/ItemResponse").ItemResponse | undefined>;
};
export declare function useResources(resourceName: string): {
    record: {};
    setRecord: import("react").Dispatch<import("react").SetStateAction<{}>>;
};
