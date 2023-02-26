import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// icons
import { BiShow } from 'react-icons/bi'
import { MdAlternateEmail } from 'react-icons/md'
import { FiUserPlus } from 'react-icons/fi'

// hooks
import useForm from './../../hooks/useForm' 
// style
import './Login.css'
import Input from '../../components/Input/Input'

export default function Login() {
const [formState, inputChangeHandler]=useForm({
  userName:{
    value:"",
    isValid:false
  },
  password:{
    value:"",
    isValid:false
  }
},false)
const inputRef=useRef()


  return (
    <div className='auth'>
      <div className="auth__wrapper">
        <div className="auth__content">
          <div className="auth__logoBox">
            <img className='auth__logoimg' src="./images/logo-mobile.png" alt="" />
          </div>
      
            <h4 className="auth__title">ورود</h4>
            <form className="auth__form">
            <Input inputChangeHandler={inputChangeHandler} 
            type="text" 
            label="نام کاربری"
            name="userName"
            icon=<MdAlternateEmail className="input__icon" />
            validation="userName"/>
             <Input inputChangeHandler={inputChangeHandler}
            type="text" 
            label="رمز عبور"
            name="password"
            icon=<BiShow className="input__icon" />
            validation="password"
            />
              <div className="login__checkbox">
              <input type="checkbox" name="saveme" id="" />
              <span className="login__checkboxText">مرا به خاطر بسپار</span>
              </div>
              <div className="login__btns">
              <button type="submit" className={`login__btn ${formState.isFormValid?"login__btn--active":"login__btn--disable"}`}>ورود</button>
              <button type="submit" className='login__btn login__btn--forget'>فراموشی گذرواژه</button>
              </div>
            </form>
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
  )
}
