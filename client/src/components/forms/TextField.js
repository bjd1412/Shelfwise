
function TextField({ formik, name, placeholder, label, type = "text", error }) {
  return (
    <div className="textfield-container">
      <label htmlFor={name}>{label}</label>
      {name === "summary" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={10}
          cols={50}
          className="google-docs-textarea"
        />
      ) : (
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      )}
      {(formik.touched[name] && formik.errors[name]) || error ? (
        <div className="formik-error">
          {formik.touched[name] && formik.errors[name]
            ? formik.errors[name]
            : error}
        </div>
      ) : null}
    </div>
  );
}

export default TextField