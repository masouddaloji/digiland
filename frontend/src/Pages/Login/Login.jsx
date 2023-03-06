import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// icons
import { BiShow } from 'react-icons/bi'
import { MdAlternateEmail } from 'react-icons/md'
import { FiUserPlus } from 'react-icons/fi'
// components
import Input from '../../components/Input/Input'
// validator
import { LoginSchema } from '../../components/Validator/Validator'
// style
import './Login.css'
import { Form, Formik } from 'formik'

export default function Login() {

const inputRef=useRef()


  return (
    <Formik 
    initialValues={{
      loginUserName:"",
      loginPassword:"",

    }}
    validationSchema={LoginSchema}
    onSubmit={(values,{resetForm})=>{
      console.log(values)
      resetForm()
    }}
    >
        {formik=>(
          <Form>
          <div className='auth'>
      <div className="auth__wrapper">
        <div className="auth__content">
          <div className="auth__logoBox">
            <img className='auth__logoimg' src="./images/logo-mobile.png" alt="" />
          </div>
      
            <h4 className="auth__title">ورود</h4>
            <div className="auth__form">
            <Input 
            type="text" 
            label="نام کاربری"
            name="loginUserName"
            icon=<MdAlternateEmail className="input__icon" />
            />
             <Input 
            type="password" 
            label="رمز عبور"
            name="loginPassword"
            icon=<BiShow className="input__icon" />
            />
              <div className="login__checkbox">
              <input type="checkbox" name="saveme" id="" />
              <span className="login__checkboxText">مرا به خاطر بسپار</span>
              </div>
              <div className="login__btns">
              <button disabled={!(formik.dirty && formik.isValid)} type="submit" className={`login__btn ${(formik.dirty && formik.isValid)?"login__btn--active":"login__btn--disable"}`}>ورود</button>
              <button type="submit" className='login__btn login__btn--forget'>فراموشی گذرواژه</button>
              </div>
            </div>
            <span className="login__divider" >
              <i>یا</i>
            </span>
            <div className="login__boxToRegister">
              <Link to="/register" className='login__linkToRegister'>
                <FiUserPlus className='login__iconToRegister'/>
                ساخت حساب کاربری
              </Link>
            </div>
        </div>
      </div>
    </div>
          </Form>
        )}
    </Formik>
    
  )
}
