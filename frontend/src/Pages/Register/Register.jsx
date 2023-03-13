import React, { useState, useRef } from "react";
// library
import { useLocation } from "react-router-dom";
import {Formik,Form} from 'formik'
// icons
import { MdAlternateEmail } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";

// components
import Input from "../../components/Input/Input";
// validator``
import { RegisterSchema } from "../../components/Validator/Validator";


import { persianTexts } from "../../text";
import Validator from "../../components/Validator/Validator";

// styles
import "./Register.css";

export default function Register() {
  return (
    <Formik 
    initialValues={{
      registerPhoneNumber:"",
      registerUserName:"",
      registerEmail:"",
      registerPassword:"",
      registerConfirmPassword:"",
    }}
    validationSchema={RegisterSchema}
    onSubmit={(values,{resetForm})=>{
      console.log(values)
      resetForm()
      }}
    >
    {formik=>(
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

           <h4 className="auth__title">ثبت نام</h4>
           <Form className="auth__form">
             <Input
               type="text"
               label="شماره موبایل"
               name="registerPhoneNumber"
               icon=<HiOutlineDevicePhoneMobile className="input__icon" />


             />
             <Input
               type="text"
               label="نام کاربری"
               name="registerUserName"
               icon=<IoPersonOutline className="input__icon" />


             />

             <Input
               type="email"
               label="ایمیل"
               name="registerEmail"
               icon=<MdAlternateEmail className="input__icon" />



             />
             <Input
               type="password"
               label="رمز عبور"
               name="registerPassword"

             />
             <Input
               type="password"
               label="تکرار رمز عبور"
               name="registerConfirmPassword"

             />

             <button
               disabled={!(formik.isValid && formik.dirty)}
               type="submit"
               className={`register__btn ${
                (formik.isValid && formik.dirty)
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
