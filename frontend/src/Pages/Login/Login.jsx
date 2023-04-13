import React, { useEffect, useRef, useState } from "react";
// Packages
import { Link, useNavigate,useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
// components
import FormControl from "../../components/FormControl/FormControl";
import axios from "../../api/axios";
// validator
import { LoginSchema } from "../../components/Validator/Validator";
// hooks
import useAuth from "../../hooks/useAuth";
// icons
import { MdAlternateEmail } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";

// persian texts
import { persianTexts } from "../../text";
// style
import "./Login.css";

export default function Login() {
  const userNameRef = useRef();
  const navigate = useNavigate();
  const location=useLocation()

  // const prevLocation = location.state && location.state.from;
  const prevLocation = location.state 
  console.log("Previous page:", prevLocation);
  const { setAuth,persist,setPersist } = useAuth();
  console.log("location.state.from",location?.state?.from)
  const persistHandler=()=>{
    setPersist(prev=>!prev)
  }
  useEffect(() => {
 
  }, []);
  useEffect(()=>{
    localStorage.setItem("persist",JSON.stringify(persist))
  },[persist])

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
        }
          const response = await axios.post("auth/login", userData, {
            withCredentials: true,
          });
          if(response?.status===200){
             const accessToken=response?.data?.accessToken
             const decode = jwt_decode(accessToken)
             setAuth((prev) => ({
               ...prev,
               token:accessToken,
             }))
            toast.success(persianTexts.login.logginSuccess)
             resetForm()
             if(decode?.role !== "superAdmin" && decode?.role !=="admin"){
               navigate(-1)
             }else{
                navigate("/adminpanel/dashboard")
             }
             
          }else if(response?.status===401){
            toast.error(persianTexts.login.loginNotMatch)
          }else{
            toast.error(persianTexts.login.logginError)
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
                    controler="text"
                    label="نام کاربری"
                    name="loginUserName"
                    ref={userNameRef}
                    icon=<MdAlternateEmail className="formControl__icon" />
                  />
                  <FormControl
                    controler="password"
                    label="رمز عبور"
                    name="loginPassword"
                    icon=<RiLockPasswordLine className="formControl__icon" />
                  />
                    <div className="login__btns">
                  <div className="login__checkbox">
                    <input type="checkbox" name="saveme" id="" checked={persist} onChange={persistHandler}/>
                    <span className="login__checkboxText">
                      مرا به خاطر بسپار
                    </span>
                  </div>
                  <button type="submit" className="login__forget">
                      فراموشی گذرواژه
                    </button>
                    </div>
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
