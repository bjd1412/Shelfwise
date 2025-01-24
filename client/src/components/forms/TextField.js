function TextField({ formik, name, placeholder, label, type = "text", error }) {
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {(formik.touched[name] && formik.errors[name]) || error ? (
          <div>
            {formik.touched[name] && formik.errors[name]
              ? formik.errors[name]
              : error}
          </div>
        ) : null}
      </div>
    );
  }

export default TextField