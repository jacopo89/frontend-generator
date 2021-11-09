import { MainResource } from "./MainResource";
export declare function useGetResourceModel(resourceName: string): MainResource;
/**
 * This method allows to fetch the model from the backend and put it the redux store.
 * @param overrideRegistry is a frontend override of the properties
 * @param route where to fetch the model.
 *
 * Returns true when the model has been fetched.
 */
export declare function useSetResourceModel(overrideRegistry: any, route?: string): boolean;
export declare function override(original: any, overrideElement: any): any;
