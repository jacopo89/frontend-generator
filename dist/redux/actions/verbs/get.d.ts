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
export function useGet(): {
    data: undefined;
    get: (route: any) => Promise<any>;
};
export const GET_LOADING: "GET_LOADING";
export const GET_SUCCESS: "GET_SUCCESS";
