function TextField({ formik, name, label, type = "text" }) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched[name] && formik.errors[name] && (
                <div>{formik.errors[name]}</div>
            )}
        </div>
    );
}

export default TextField