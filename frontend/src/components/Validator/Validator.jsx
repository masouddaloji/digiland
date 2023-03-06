// library
import * as Yup from "yup";
// components
import { persianTexts } from "../../text";
// pattern
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g;
const passwordPattern =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%&*-+=:;,._₹]).{9,25}$/gm;
const phoneNumberPattern = /^(\+98|098|0|0098|98)?(9\d{9})$/g;
const userNamePattern = /[A-Za-z0-9._]{7,15}/gm;
const coverPattern = /(\.jpg|\.jpeg|\.png)$/i;



const Validator = Yup.object().shape({
  registerPhoneNumber: Yup.string()
    .required(persianTexts.error.register.input.phoneNumber.required)
    .matches(
      phoneNumberPattern,
      persianTexts.error.register.input.phoneNumber.regex
    ),
  registerUserName: Yup.string()
    .min(7, persianTexts.error.register.input.userName.min)
    .required(persianTexts.error.register.input.userName.required)
    .max(25, persianTexts.error.register.input.userName.max)
    .matches(userNamePattern, persianTexts.error.register.input.userName.regex),
  registerEmail: Yup.string()
    .required(persianTexts.error.register.input.email.required)
    .email(persianTexts.error.register.input.email.regex),
  registerPassword: Yup.string()
    .required(persianTexts.error.register.input.password.required)
    .min(9, persianTexts.error.register.input.password.min)
    .max(25, persianTexts.error.register.input.password.max)
    .matches(passwordPattern, persianTexts.error.register.input.password.regex),
  registerConfirmpassword: Yup.string()
    .required(persianTexts.error.register.input.confirmPassword.required)
    .oneOf([
      Yup.ref("password", null),
      persianTexts.error.register.input.confirmPassword.regex,
    ]),
});

export default Validator;


