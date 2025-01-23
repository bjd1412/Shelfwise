import React from "react";
import {useFormik} from "formik"

function BaseForm({ initialValues, validationSchema, onSubmit, children }) {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { formik })
            )}
            <button type="submit">Submit</button>
        </form>
    );
}

export default BaseForm