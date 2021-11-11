export function EnhancedTableHead(props: any): JSX.Element;
export namespace EnhancedTableHead {
    namespace propTypes {
        const classes: PropTypes.Validator<object>;
        const numSelected: PropTypes.Validator<number>;
        const onRequestSort: PropTypes.Validator<(...args: any[]) => any>;
        const onSelectAllClick: PropTypes.Validator<(...args: any[]) => any>;
        const order: PropTypes.Validator<string>;
        const orderBy: PropTypes.Validator<string>;
        const rowCount: PropTypes.Validator<number>;
        const headCells: PropTypes.Validator<any[]>;
    }
}
export function FilterList({ resourceName, filters: lockedFilters, itemOperations, collectionOperations }: {
    resourceName: any;
    filters: any;
    itemOperations?: any[] | undefined;
    collectionOperations?: any[] | undefined;
}): JSX.Element;
export function GenericList({ data: rows, totalItems, loading, page, setPage, selected, setSelected, title, clearFilters, filterBarComponents, showClearFilters, components, itemOperations, collectionOperations, headCells, columns, allColumns, setTable, getDataHandler, getDataHandlerDebounced }: {
    data: any;
    totalItems: any;
    loading: any;
    page: any;
    setPage: any;
    selected: any;
    setSelected: any;
    title: any;
    clearFilters: any;
    filterBarComponents: any;
    showClearFilters: any;
    components: any;
    itemOperations?: any[] | undefined;
    collectionOperations?: any[] | undefined;
    headCells: any;
    columns: any;
    allColumns: any;
    setTable: any;
    getDataHandler: any;
    getDataHandlerDebounced: any;
}): JSX.Element;
import PropTypes from "prop-types";
