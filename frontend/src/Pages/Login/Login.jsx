import React, { useContext, useRef, useState } from "react";
// Packages
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
// icons
import { BiShow } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
// components
import FormControl from "../../components/FormControl/FormControl";
// validator
import { LoginSchema } from "../../components/Validator/Validator";

// persian texts
import { persianTexts } from "../../text";
// hooks
import useAuth from "../../hooks/useAuth";
// style
import "./Login.css";

export default function Login() {
  const inputRef = useRef();

  const navigate = useNavigate();
const{setAuth}=useAuth
  return (
    <Formik
      initialValues={{
        loginUserName: "",
        loginPassword: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        const userData = {
          email: values.loginUserName,
          pwd: values.loginPassword,
        };
        const response = await axios.post("auth/login", userData);
        if (response?.status === 200) {
          toast.success(persianTexts.login.logginSuccess);
          setAuth(prev=>({...prev,token:response.data.accessToken,isLogin:true}))
          navigate("/");
          resetForm();
        } else {
          toast.error(persianTexts.login.logginError);
        }
      }}
    >
      {(formik) => (
        <Form>
          <div className="auth">
            <div className="auth__wrapper">
              <div className="auth__content">
                <div className="auth__logoBox">
                  <img
                    className="auth__logoimg"
                    src="./images/logo-mobile.png"
                    alt=""
                  />
                </div>

                <h4 className="auth__title">ورود</h4>
                <div className="auth__form">
                  <FormControl
                    type="text"
                    label="نام کاربری"
                    name="loginUserName"
                    icon=<MdAlternateEmail className="formControl__icon" />
                  />
                  <FormControl
                    type="password"
                    label="رمز عبور"
                    name="loginPassword"
                    icon=<BiShow className="formControl__icon" />
                  />
                  <div className="login__checkbox">
                    <input type="checkbox" name="saveme" id="" />
                    <span className="login__checkboxText">
                      مرا به خاطر بسپار
                    </span>
                  </div>
                  <div className="login__btns">
                    <button
                      disabled={!(formik.dirty && formik.isValid)}
                      type="submit"
                      className={`login__btn ${
                        formik.dirty && formik.isValid
                          ? "login__btn--active"
                          : "login__btn--disable"
                      }`}
                    >
                      ورود
                    </button>
                    <button type="submit" className="login__forget">
                      فراموشی گذرواژه
                    </button>
                  </div>
                </div>
                <span className="login__divider">
                  <i>یا</i>
                </span>
                <div className="login__boxToRegister">
                  <Link to="/register" className="login__linkToRegister">
                    <FiUserPlus className="login__iconToRegister" />
                    ساخت حساب کاربری
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
