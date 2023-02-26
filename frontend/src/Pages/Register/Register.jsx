import React, { useState } from 'react'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {MdAlternateEmail} from 'react-icons/md'
import {BiHide,BiShow} from 'react-icons/bi'
import {HiOutlineDevicePhoneMobile} from 'react-icons/hi2'
import { IoPersonOutline } from "react-icons/io5";
import './Register.css'
import Input from '../../components/Input/Input'
import useForm from '../../hooks/useForm'

export default function Register() {
  
  const inputs=[
   {
      id:3301,
      error:"لطفا یک شماره همراه معتبر ایرانی وارد کنید",
      type:"text",
      label:"شماره موبایل",
      name:"phoneNamber",
      icon:<HiOutlineDevicePhoneMobile className="input__icon" />,
      validation:"phoneNumber"
    },
    {
      id:3302,
      error:"لطفا یک نام کاربری معتبر با طول 5 تا 15 کاراکتر وارد کنید",
      type:"text",
      label:"نام کاربری",
      name:"userName",
      icon:<HiOutlineDevicePhoneMobile className="input__icon" />,
      validation:"userName"
    },
    {
      id:3303,
      error:"لطفا یک ایمیل معتبر وارد کنید",
      type:"email",
      label:"ایمیل",
      name:"email",
      icon:<HiOutlineDevicePhoneMobile className="input__icon" />,
      validation:"email"
    },
    {
      id:3304,
      error:"لطفا یک رمز عبور معتبر که شامل حداقل یک حرف بزرگ و یک حرف کوچک و یک عدد و یک کاراکتر خاص باشد وارد کنید",
      type:"text",
      label:"رمز عبور",
      name:"password",
      icon:<HiOutlineDevicePhoneMobile className="input__icon" />,
      validation:"password"
    },
    {
      id:3305,
      error:"رمز عبور و تکرار آن یکسان نیستند",
      type:"text",
      label:"تکرار رمز عبور",
      name:"confirmPassword",
      icon:<HiOutlineDevicePhoneMobile className="input__icon" />,
    }
  ]
  const[formState,inputChangeHandler]=useForm(
   {
    phoneNamber:{
      value:"",
      isValid:false
    },
    userName:{
      value:"",
      isValid:false
    },
    email:{
      value:"",
      isValid:false
    },
    password:{
      value:"",
      isValid:false
    },
    // confirmPassword:{
    //   value:"",
    //   isValid:false
    // },
   },
   false
    )
  return (
    <div className='auth'>
      <div className="auth__wrapper">
        <div className="auth__content">
          <div className="auth__logoBox">
            <img className='auth__logoimg' src="./images/logo-mobile.png" alt="" />
          </div>
      
            <h4 className="auth__title">ثبت نام</h4>
            <form className="auth__form">
            {/* {inputs.map(input=>(
              <Input key={input.id} {...input} inputChangeHandler={inputChangeHandler}/>
            ))} */}
            <Input inputChangeHandler={inputChangeHandler} type="text" label="شماره موبایل"
            name="phoneNamber"
            icon=<HiOutlineDevicePhoneMobile className="input__icon" />
            validation="phoneNumber"/>
            <Input inputChangeHandler={inputChangeHandler} 
            type="text" 
            label="نام کاربری"
            name="userName"
            icon=<HiOutlineDevicePhoneMobile className="input__icon" />
            validation="userName"/>
            
            <Input inputChangeHandler={inputChangeHandler}
            type="email" 
            label="ایمیل"
            name="email"
            icon=<HiOutlineDevicePhoneMobile className="input__icon" />
            validation="email"
            />
            <Input inputChangeHandler={inputChangeHandler}
            type="text" 
            label="رمز عبور"
            name="password"
            icon=<HiOutlineDevicePhoneMobile className="input__icon" />
            validation="password"
            />

              {/* <label htmlFor="phoneNumber" className="auth__label">شماره موبایل</label>
              <div className="auth__inputBox">
              <input type="text" name="phoneNumber" id="phoneNumber" className={`auth__input ${error && "input--invalid"}`} ref={inputRef}/>
                <HiOutlineDevicePhoneMobile className="auth__icon" />
                {error && <span className="auth__error">لطفا نام کاربری صحیح وارد کنید</span>}
              </div>
              <label htmlFor="userName" className="auth__label">نام کاربری</label>
              <div className="auth__inputBox">
              <input type="text" name="userName" id="userName" className="auth__input" ref={inputRef}/>
                <IoPersonOutline className="auth__icon" />
              </div>
              <label htmlFor="useremail" className="auth__label">ایمیل</label>
              <div className="auth__inputBox">
              <input type="text" name="useremail" id="useremail" className="auth__input" ref={inputRef}/>
                <MdAlternateEmail className="auth__icon" />
              </div>
              <label htmlFor="userPassword" className="auth__label">گذرواژه</label>
              <div className="auth__inputBox">
              <input type="text" name="userPassword" id="userPassword" className="auth__input" ref={inputRef}/>
                <BiShow className="auth__icon" />
              </div>
              <label htmlFor="conformUserPassword" className="auth__label"> تکرار گذرواژه</label>
              <div className="auth__inputBox">
              <input type="text" name="conformUserPassword" id="conformUserPassword" className="auth__input" ref={inputRef}/>
                <BiShow className="auth__icon" />
              </div> */}
              <button disabled={!formState.isFormValid} type="submit" className={`register__btn ${formState.isFormValid?"register__btn--active":"register__btn--disable"}`}>عضویت</button>
            </form>

        </div>
      </div>
    </div>
  )
}
