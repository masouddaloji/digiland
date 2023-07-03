import { useCallback } from "react";
// packages
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
//rtk query
import { useRegisterUserMutation } from "../../features/auth/authApiSlice";
//hooks
import useTitle from "../../hooks/useTitle";
// icons
import { MdLock } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
// components
import FormControl from "../../components/FormControl/FormControl";
// validator``
import { RegisterSchema } from "../../components/Validator/Validator";
// text
import { persianTexts } from "../../text";
// styles
import "./Register.css";

export default function Register() {
  const [registerUser, { isSuccess, isLoading, isError }] =
    useRegisterUserMutation();
  const navigate = useNavigate();
  useTitle("ساخت حساب")
  const registerHandler = useCallback(async (data) => {
    const userData = {
      email: data.registerEmail,
      pwd: data.registerPassword,
    };
    await registerUser(userData)
      .unwrap()
      .then(() => {
        toast.success(persianTexts.register.registerSuccess);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(persianTexts.register.registerError);
      });
  },[]);
  return (
    <Formik
      initialValues={{
        registerEmail: "",
        registerPassword: "",
        registerConfirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { resetForm }) => {
        registerHandler(values);
        resetForm();
      }}
    >
      {(formik) => (
        <Form>
          <div className="auth">
            <div className="container">
              <div className="auth__wrapper">
                <div className="auth__imageBox">
                  <img
                    src="./images/auth/login -1.jpg"
                    alt=""
                    className="auth__image"
                  />
                </div>
                <div className="auth__content">
                  <div className="auth__logoBox">
                    <img
                      className="auth__logoimg"
                      src="./images/logo-mobile.png"
                      alt="auth logo image"
                    />
                  </div>

                  <div className="auth__form">
                    <h3 className="auth__title">
                      {" "}
                      {persianTexts.register.registerTitle}
                    </h3>
                    <FormControl
                      controler="email"
                      label="ایمیل"
                      name="registerEmail"
                      autoFocus
                      icon={<HiOutlineMail className="input__icon" />}
                    />
                    <FormControl
                      controler="password"
                      label="رمز عبور"
                      name="registerPassword"
                      icon={<MdLock className="input__icon" />}
                    />
                    <FormControl
                      controler="password"
                      label="تکرار رمز عبور"
                      name="registerConfirmPassword"
                      icon={<MdLock className="input__icon" />}
                    />

                    <button
                      disabled={!(formik.isValid && formik.dirty)}
                      type="submit"
                      className={`auth__btn ${
                        formik.isValid && formik.dirty && "auth__btn--active"
                      }`}
                    >
                      {persianTexts.register.registerBtn}
                    </button>
                    <div className="auth__loginOptions">
                      <span>{persianTexts.login.otherAcount}</span>
                      <div className="otherAccount">
                        <div className="accountBox">
                          <span>Discord</span>
                          <img
                            src="./images/auth/logo-discord.png"
                            alt="google logo"
                            className="account__image"
                          />
                        </div>
                        <div className="accountBox">
                          <span>Facebook</span>
                          <img
                            src="./images/auth/logo-facebook.png"
                            alt="google logo"
                            className="account__image"
                          />
                        </div>
                        <div className="accountBox">
                          <span>Google</span>
                          <img
                            src="./images/auth/logo-google.png"
                            alt="google logo"
                            className="account__image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

