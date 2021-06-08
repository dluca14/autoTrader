import React from "react";
import {TextField} from "@material-ui/core";
import {useField} from "formik";

const TextFieldWrapper = ({
    name,
    ...otherProps
    }) => {
    const [field, meta] = useField(name);

    const textfieldConfig = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    }

    if (meta && meta.touched && meta.error) {
        textfieldConfig.error = true;
        textfieldConfig.helperText = meta.error;
    }

    return (
        <TextField {...textfieldConfig}/>
    );
}
export default TextFieldWrapper;