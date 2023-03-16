import React, { useState, useRef } from "react";
// library
import { useLocation } from "react-router-dom";
import {Formik,Form} from 'formik'
// icons
import { MdAlternateEmail } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";

// components
import FormControl from "../../components/FormControl/FormControl";
// validator``
import { RegisterSchema } from "../../components/Validator/Validator";
// text
import { persianTexts } from "../../text";

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
             <FormControl
               type="text"
               label="شماره موبایل"
               name="registerPhoneNumber"
               icon=<HiOutlineDevicePhoneMobile className="formControl__icon" />


             />
             <FormControl
               type="text"
               label="نام کاربری"
               name="registerUserName"
               icon=<IoPersonOutline className="formControl__icon" />


             />

             <FormControl
               type="email"
               label="ایمیل"
               name="registerEmail"
               icon=<MdAlternateEmail className="formControl__icon" />



             />
             <FormControl
               type="password"
               label="رمز عبور"
               name="registerPassword"

             />
             <FormControl
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
