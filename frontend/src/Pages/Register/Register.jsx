// packages
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import axios from "./../../api/axios";
//rtk query
import { useRegisterUserMutation } from "../../features/auth/authApiSlice";
// icons
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

// components
import FormControl from "../../components/FormControl/FormControl";
// validator``
import { RegisterSchema } from "../../components/Validator/Validator";
// text
import { persianTexts } from "../../text";

// styles
import "./Register.css";

export default function Register() {
  const [registerUser,{isSuccess,isLoading,isError}]=useRegisterUserMutation()
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        registerEmail: "",
        registerPassword: "",
        registerConfirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { resetForm }) => {
        const userData = {
          email: values.registerEmail,
          pwd: values.registerPassword,
        };
        await registerUser(userData).unwrap()
        .then(()=>{
          resetForm()
          toast.success(persianTexts.register.registerSuccess)
          navigate("/login")
          })
        .catch(error=>{
          toast.error(persianTexts.register.registerError)
          resetForm()
        })

      }}
    >
      {(formik) => (
        <div className="auth">
          <div className="auth__wrapper">
            <div className="auth__content">
              <div className="auth__logoBox">
                <img
                  className="auth__logoimg"
                  src="./images/logo-mobile.png"
                  alt="auth logo image"/>
              </div>

              <h4 className="auth__title">ثبت نام</h4>
              <Form className="auth__form">
                <FormControl
                  controler="email"
                  label="ایمیل"
                  name="registerEmail"
                  autoFocus 
                  icon={<MdAlternateEmail className="input__icon" />}
                />
                <FormControl
                  controler="password"
                  label="رمز عبور"
                  name="registerPassword"
                  icon={<RiLockPasswordLine className="input__icon" />}
                />
                <FormControl
                  controler="password"
                  label="تکرار رمز عبور"
                  name="registerConfirmPassword"
                  icon={<RiLockPasswordLine className="input__icon" />}
                />

                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className={`register__btn ${
                    formik.isValid && formik.dirty
                      ? "register__btn--active"
                      : "register__btn--disable"
                  }`}
                >
                  عضویت
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
