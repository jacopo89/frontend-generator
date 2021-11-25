export default appReducer;
declare function appReducer(state: {
    resource: null;
    statusBar: {
        message: undefined;
        severity: string;
    };
    resourceBuffer: Map<any, any>;
    listings: Map<any, any>;
    listingLoading: boolean;
    registry: never[];
} | undefined, action: any): {
    resource: any;
    statusBar: {
        message: undefined;
        severity: string;
    };
    resourceBuffer: Map<any, any>;
    listings: Map<any, any>;
    listingLoading: boolean;
    registry: never[];
} | {
    theme: any;
    resource: null;
    statusBar: {
        message: undefined;
        severity: string;
    };
    resourceBuffer: Map<any, any>;
    listings: Map<any, any>;
    listingLoading: boolean;
    registry: never[];
} | {
    statusBar: {
        message: any;
        severity: any;
    };
    resource: null;
    resourceBuffer: Map<any, any>;
    listings: Map<any, any>;
    listingLoading: boolean;
    registry: never[];
} | {
    resourceBuffer: any;
    resource: null;
    statusBar: {
        message: undefined;
        severity: string;
    };
    listings: Map<any, any>;
    listingLoading: boolean;
    registry: never[];
} | {
    listings: any;
    listingLoading: boolean;
    resource: null;
    statusBar: {
        message: undefined;
        severity: string;
    };
    resourceBuffer: Map<any, any>;
    registry: never[];
} | {
    registry: any;
    resource: null;
    statusBar: {
        message: undefined;
        severity: string;
    };
    resourceBuffer: Map<any, any>;
    listings: Map<any, any>;
    listingLoading: boolean;
} | {
    listingLoading: any;
    resource: null;
    statusBar: {
        message: undefined;
        severity: string;
    };
    resourceBuffer: Map<any, any>;
    listings: Map<any, any>;
    registry: never[];
};
