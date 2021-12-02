import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Grid from "@material-ui/core/Grid";
export default function (props) {
    const { components } = props;
    return _jsx(Grid, Object.assign({ container: true }, { children: components.filter((item) => item.isOrder === false).map((item, index) => _jsx(Grid, Object.assign({ item: true, xs: 4, md: 4 }, { children: React.cloneElement(item.component, { variant: "outlined" }) }), index)) }), void 0);
}
