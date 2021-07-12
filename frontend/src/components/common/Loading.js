import {CircularProgress} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";

export default function Loading() {
    return (<Box
        style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
    >
        <CircularProgress/>
    </Box>)
}
