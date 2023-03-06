// library
import * as Yup from "yup";
import { persianTexts } from "../../text";
// pattern
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
const phoneNumberPattern = /^(\+98|098|0|0098|98)?(9\d{9})$/;
const userNamePattern = /[A-Za-z0-9._]{8,25}/;
const passwordPattern =/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%&*-+=:;,._₹]).{8,25}$/;
// const coverPattern = /(\.jpg|\.jpeg|\.png)$/i;

export const RegisterSchema = Yup.object().shape({
  registerPhoneNumber: Yup.string()
  .required(persianTexts.error.register.input.phoneNumber.required)
    .matches(
      phoneNumberPattern,
      persianTexts.error.register.input.phoneNumber.regex
    )
    ,
    registerUserName: Yup.string()
    .required(persianTexts.error.register.input.userName.required)
    .matches(
      userNamePattern,
      persianTexts.error.register.input.userName.regex
    )
    .min(8,persianTexts.error.register.input.userName.min)
    .max(25,persianTexts.error.register.input.userName.max),

    registerEmail: Yup.string()
    .required(persianTexts.error.register.input.email.required)
    .email(persianTexts.error.register.input.email.regex)
      .matches(
        emailPattern,
        persianTexts.error.register.input.email.regex
      ),

  registerPassword: Yup.string()
  .required(persianTexts.error.register.input.password.required)
  .matches(
    passwordPattern,
    persianTexts.error.register.input.password.regex
  )
  .min(8,persianTexts.error.register.input.password.min)
  .max(25,persianTexts.error.register.input.password.max)
  ,
  registerConfirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("registerPassword")],
      persianTexts.error.register.input.confirmPassword.regex
    )
    .required(persianTexts.error.register.input.confirmPassword.required),
});
export const LoginSchema = Yup.object().shape({

    loginUserName: Yup.string()
    .required(persianTexts.error.register.input.userName.required)
    .matches(
      userNamePattern,
      persianTexts.error.register.input.userName.regex
    )
    .min(8,persianTexts.error.register.input.userName.min)
    .max(25,persianTexts.error.register.input.userName.max),

  loginPassword: Yup.string()
  .required(persianTexts.error.register.input.password.required)
  .matches(
    passwordPattern,
    persianTexts.error.register.input.password.regex
  )
  .min(8,persianTexts.error.register.input.password.min)
  .max(25,persianTexts.error.register.input.password.max)
});


