/// <reference types="react" />
interface ResourceContext {
    propResourceName: string;
    propId: number;
}
export declare function useGetResourceContext({ propResourceName, propId }: ResourceContext): {
    record: import("../../../resource-models/Record").Record;
    setRecord: import("react").Dispatch<import("react").SetStateAction<import("../../../resource-models/Record").Record>>;
    getResource: () => Promise<import("../../../redux/actions/verbs/CollectionResponse").CollectionResponse | import("../../../redux/actions/verbs/ItemResponse").ItemResponse | undefined>;
};
export {};
