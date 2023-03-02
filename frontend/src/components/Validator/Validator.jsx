import React, { useState } from "react";

function Validator(fieldName, value) {
  const isValid = [];
  const emailValidator = (value) => {
   const emailPattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g
   const emailValid=emailPattern.test(value)
   !emailValid && isValid.push(false)
  };
 
  const passwordValidator = (value) => {
    const passwordPattern =/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%&*-+=:;,._₹]).{8,20}$/gm;
     const passwordValid=passwordPattern.test(value)
    !passwordValid && isValid.push(false);
  };
  const phoneNumberValidator = (value) => {
    const phoneNumberPattern = /^(\+98|098|0|0098|98)?(9\d{9})$/g;
    const phoneNumberValid=phoneNumberPattern.test(value)
    !phoneNumberValid && isValid.push(false);
  };
  const userNameValidator = (value) => {
    const userNamePattern =/[A-Za-z0-9._]{7,15}/gm;  
    const userNameValid=userNamePattern.test(value)
    !userNameValid && isValid.push(false);
  };
  const textValidator=value=>{
    if(value.trim().length<3){
      isValid.push(false)
    }
  }
  const coverValidator=value=>{
    const coverPattern=/(\.jpg|\.jpeg|\.png)$/i
    const coverValid=coverPattern.test(value)
    !coverValid && isValid.push(false)
  }
  switch (fieldName) {
    case "email": {
      emailValidator(value);
      break;
    }
    case "password": {
      passwordValidator(value);
      break;
    }
   
    case "phoneNumber": {
      phoneNumberValidator(value);
      break;
    }
    case "userName": {
      userNameValidator(value);
      break;
    }
    case "text":{
      textValidator(value)
      break;
    }
    case "cover":{
      coverValidator(value)
      break;
    }

    default:
      break;
  }
  if (isValid.length) {
    return false;
  } else {
    return true;
  }
}

export default Validator;
