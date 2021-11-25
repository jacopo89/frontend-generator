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
export function useGetOne(): {
    data: undefined;
    getOne: (resourceName: any, id: any) => Promise<any>;
};
export const GET_ONE_SUCCESS: "GET_ONE_SUCCESS";
export const GET_ONE_LOADING: "GET_ONE_LOADING";
