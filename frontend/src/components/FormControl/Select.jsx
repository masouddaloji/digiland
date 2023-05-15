import { useEffect, useRef, useState } from "react";
//packages
import { useField, useFormikContext } from "formik";
//icons
import { HiChevronDown } from "react-icons/hi";
//persian text
import { persianTexts } from "../../text";

const Select = (props) => {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue, setFieldTouched, resetForm } = useFormikContext();
  const [isShowOptions, setIsShowOptions] = useState(false);

  const tochedHandler = () => {
    setFieldTouched(field.name, true);
  };
  const [selectValue, setSelectValue] = useState("");
  const containerRef = useRef();

  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (!containerRef?.current?.contains(e.target)) {
        setIsShowOptions(false);
      }
    };
    document.body.addEventListener("click", outsideClickHandler);
    return () => {
      document.body.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  useEffect(() => {
    const convertRatingNumberToText = (number) => {
      switch (number) {
        case 1: {
          setSelectValue("بد");
          break;
        }
        case 2: {
          setSelectValue("متوسط");
          break;
        }
        case 3: {
          setSelectValue("خوب");
          break;
        }
        case 4: {
          setSelectValue("خیلی خوب");
          break;
        }
        case 5: {
          setSelectValue("عالی");
          break;
        }

        default: {
          setSelectValue(
            persianTexts.admin.products.placeholder.inputPlaceholderRating
          );
          break;
        }
      }
    };
    convertRatingNumberToText(field.value);
  }, [field.value]);

  return (
    <div className="formControl__wrapper" ref={containerRef}>
      {props?.label && (
        <label
          htmlFor={field.name}
          className={`formControl__label ${
            meta.touched && meta.error ? "label--invalid" : undefined
          }`}
        >
          {props?.icon ? props.icon : null}
          {props.label}
        </label>
      )}
      <div
        className={`checkbox ${
          meta.touched && meta.error && "formControl--invalid"
        }`}
        onClick={() => setIsShowOptions(!isShowOptions)}
      >
        <span
          className={`checkbox__header ${
            meta.touched && meta.error ? "label--invalid" : undefined
          }`}
        >
          {selectValue ? selectValue : props.placeholder}
        </span>
        <HiChevronDown className="dropdownIcon" />
      </div>

      {props.options && (
        <ul
          className={`checkbox__lists ${
            isShowOptions
              ? "checkbox__lists checkbox__lists--show"
              : "checkbox__lists"
          }`}
        >
          {props?.options?.map((option, index) => (
            <li
              className="checkbox__item"
              key={option.value}
              onClick={() => {
                tochedHandler();
                setFieldValue(field.name, option.value);
                setIsShowOptions(false);
              }}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}

      {meta.touched && meta.error && (
        <span className="auth__error">{meta.error}</span>
      )}
    </div>
  );
};

export default Select;
