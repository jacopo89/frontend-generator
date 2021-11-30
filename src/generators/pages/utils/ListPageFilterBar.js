import React from 'react';
import Grid from "@material-ui/core/Grid";

export default function(props) {
    const {components} = props
    return <Grid container>
        {components.filter((item)=> item.isOrder===false).map((item, index) => <Grid key={index} item xs={4} md={4}>{React.cloneElement(item.component, {variant:"outlined"})}</Grid>)}
    </Grid>;
}
