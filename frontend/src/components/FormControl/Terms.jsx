//packages
import { useField } from "formik";

const Terms = (props) => {
  const [field, meta, helpers] = useField(props);
  const { setTouched, setValue } = helpers;
  return (
    <>
      <div className="termsAndConditions">
        <input
          type="checkbox"
          name="acceptTerms"
          onChange={(e) => {
            setTouched(true);
            setValue(e.target.checked);
          }}
        />
        من شرایط و مقررات سایت را خوانده ام و آن را می پذیرم.
      </div>
      {meta.touched && meta.error ? (
        <span className="auth__error">{meta.error}</span>
      ) : null}
    </>
  );
};

export default Terms;
