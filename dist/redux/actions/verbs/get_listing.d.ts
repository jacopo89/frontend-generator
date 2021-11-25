export function error(error: any): {
    type: string;
    error: any;
};
export function loading(loading: any): {
    type: string;
    loading: any;
};
export function success(retrieved: any): {
    type: string;
    retrieved: any;
};
export function useGetListingGroup(): {
    data: never[];
    getListingGroup: (resources: any) => Promise<any>;
    loading: typeof loading;
};
export const LISTING_LOADING: "LISTING_LOADING";
