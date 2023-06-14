// packages
import { useField } from "formik";

const Textarea = (props) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="formControl__wrapper">
      {props.label && (
        <label htmlFor={field.name} className={`input__label ${
            meta.touched && meta.error ? "label--invalid" : undefined
          }`}>
          {props.label}
        </label>
      )}
        <textarea
          className={`textarea  ${
            meta.touched && meta.error ? "input--invalid" : undefined
          }`}
          autoComplete="off"
          id={field.name}
          {...props}
          {...field}
        />
        {meta.touched && meta.error && (
          <span className="auth__error">{meta.error}</span>
        )}
    </div>
  );
};

export default Textarea;
