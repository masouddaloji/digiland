import React, { useRef } from "react";
// packages
import { Field, useField, useFormikContext } from "formik";

const CheckBox = (props) => {
  const [field, meta, helpers] = useField(props);
  // const [isShowCheckBox, setIsShowCheckBox] = useState(false);

  const checkboxRef = useRef();
  return (
    <div className="formControl__wrapper">
      {props.label && (
        <label htmlFor={field.name} className={`formControl__label ${meta.touched && meta.error?"label--invalid":undefined}`}>
          {props.label}
        </label>
      )}
      <div className="formControl__box">
        <ul
          className={`checkbox__lists ${
            meta.touched && meta.error ? "formControl--invalid" : ""
          }`}
        >
          {props.options &&
            props.options.map((option) => (
              <li className="checkbox__item" key={option.value}>
                <Field
                  className="checkboxInput"
                  value={option.value}
                  style={{
                    backgroundColor: option.color,
                  }}
                  name={field.name}
                  type="checkbox"
                  id={option.value}
                  title={option.text}
                />
              </li>
            ))}
        </ul>

        {meta.touched && meta.error && (
          <span className="auth__error">{meta.error}</span>
        )}
      </div>
    </div>
  );
};

export default CheckBox;
