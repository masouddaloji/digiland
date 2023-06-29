import { useEffect, useMemo, useRef, useState } from "react";
//packages
import { useField } from "formik";
//hooks
import useOutsideClick from "../../hooks/useOutsideClick";
//icons
import { HiChevronDown } from "react-icons/hi";

const Select = (props) => {
  const containerRef = useRef();
  const [field, meta, helpers] = useField(props);
  const { setTouched, setValue } = helpers;
  const { options, label, icon, selectType, setSelectedProvince, placeholder } =
    props;

  const [selectValue, setSelectValue] = useState(field.value);

  const [isShowOptions, setIsShowOptions] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  // filter optioon when selectType === "province"
  const filterOptions = useMemo(() => {
    if (selectType === "province") {
      if (options?.length === 0) return [];

      return options?.filter((option) => option.includes(searchValue.trim()));
    }
  }, [options, searchValue]);

  useOutsideClick({ ref: containerRef, setStateHandler: setIsShowOptions });

  useEffect(() => {
    if (
      selectType === "province" &&
      !field.value &&
      typeof setSelectedProvince === "function"
    ) {
      setSelectedProvince("");
      setSelectValue("");
    }
    if (!field.value) setSelectValue("");
  }, [field.value]);

  return (
    <div className="formControl__wrapper" ref={containerRef}>
      <div className={`inputBox`}>
        <div
          className={`checkbox ${
            meta.touched && meta.error && "input--invalid"
          }`}
          onClick={() => setIsShowOptions(!isShowOptions)}
        >
          <span
            className={`checkbox__header ${
              meta.touched && meta.error ? "label--invalid" : undefined
            }`}
          >
            {selectType === "rating"
              ? options.find((option) => option.value === field.value)?.text
              : selectValue}
          </span>
          <HiChevronDown className="dropdownIcon" />
        </div>

        {options && (
          <ul
            className={`checkbox__lists ${
              isShowOptions
                ? "checkbox__lists checkbox__lists--show"
                : "checkbox__lists"
            }`}
          >
            {selectType === "province" && (
              <input
                type="text"
                className="select__searchInput"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            )}
            {selectType === "color" || selectType === "rating"
              ? options.map((option, index) => (
                  <li
                    className="checkbox__item"
                    key={option.value}
                    onClick={() => {
                      setTouched(true);
                      setValue(option.value);
                      setIsShowOptions(false);
                      setSelectValue(option.text);
                      setSearchValue("");
                    }}
                  >
                    {option.text}
                  </li>
                ))
              : selectType === "province"
              ? filterOptions.map((option, index) => (
                  <li
                    className="checkbox__item"
                    key={option}
                    onClick={() => {
                      setValue(option);
                      setSelectValue(option);
                      setTouched(true);
                      setIsShowOptions(false);
                      setSelectedProvince?.(option);
                      setSearchValue("");
                    }}
                  >
                    {option}
                  </li>
                ))
              : null}
          </ul>
        )}

        {/* label for input */}
        <span
          className={`input__infoBox ${field?.value && "input__infoBox--top"}`}
        >
          {props?.icon ?? null}
          {props.label && <span className={`input__label`}>{props.label}</span>}
        </span>
      </div>

      {meta.touched && meta.error ? (
        <span className="auth__error">{meta.error}</span>
      ) : null}
    </div>
  );
};

export default Select;
