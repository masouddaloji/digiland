// library
import * as Yup from "yup";
import { persianTexts } from "../../text";
// pattern
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
const phoneNumberPattern = /^(\+98|098|0|0098|98)?(9\d{9})$/;
const userNamePattern = /[A-Za-z0-9._]{8,25}/;
const passwordPattern =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%&*-+=:;,._₹]).{8,25}$/;
// const coverPattern = /(\.jpg|\.jpeg|\.png)$/i;

export const RegisterSchema = Yup.object().shape({
  registerEmail: Yup.string()
    .required(persianTexts.error.register.input.email.required)
    .email(persianTexts.error.register.input.email.regex)
    .matches(emailPattern, persianTexts.error.register.input.email.regex),

  registerPassword: Yup.string()
    .required(persianTexts.error.register.input.password.required)
    .matches(passwordPattern, persianTexts.error.register.input.password.regex)
    .min(8, persianTexts.error.register.input.password.min)
    .max(25, persianTexts.error.register.input.password.max),
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
    .matches(userNamePattern, persianTexts.error.register.input.userName.regex)
    .min(8, persianTexts.error.register.input.userName.min)
    .max(25, persianTexts.error.register.input.userName.max),

  loginPassword: Yup.string()
    .required(persianTexts.error.register.input.password.required)
    .matches(passwordPattern, persianTexts.error.register.input.password.regex)
    .min(8, persianTexts.error.register.input.password.min)
    .max(25, persianTexts.error.register.input.password.max),
});
export const addProductsSchema = Yup.object().shape({
  productTitle: Yup.string()
    .required(persianTexts.error.addProducts.productTitle.required)
    .min(4, persianTexts.error.addProducts.productTitle.min),
  productPrice: Yup.number(persianTexts.error.addProducts.productPrice.number)
    .required(persianTexts.error.addProducts.productPrice.required)
    .integer(persianTexts.error.addProducts.productPrice.integer)
    .moreThan(10000, persianTexts.error.addProducts.productPrice.moreThan),
  productRating: Yup.number(persianTexts.error.addProducts.productRating.number)
    .integer(persianTexts.error.addProducts.productRating.integer)
    .moreThan(0, persianTexts.error.addProducts.productRating.moreThan)
    .required(persianTexts.error.addProducts.productRating.required),
  productQantity: Yup.number(
    persianTexts.error.addProducts.productQantity.number
  )
    .moreThan(0, persianTexts.error.addProducts.productQantity.moreThan)
    .integer(persianTexts.error.addProducts.productQantity.integer)
    .required(persianTexts.error.addProducts.productQantity.required),
  productCategory: Yup.string().required(
    persianTexts.error.addProducts.productCategory.required
  ),
  productSubCategory: Yup.string().required(
    persianTexts.error.addProducts.productSubCategory.required
  ),
  productSegment: Yup.string().required(
    persianTexts.error.addProducts.productSegment.required
  ),
  productColors: Yup.array()
    .required(persianTexts.error.addProducts.productColors.required)
    .min(1, persianTexts.error.addProducts.productColors.min)
    .max(3, persianTexts.error.addProducts.productColors.max),
  productBrand: Yup.string().required(
    persianTexts.error.addProducts.productBrand.required
  ),
  productOffPrice: Yup.number(
    persianTexts.error.addProducts.productOffPrice.number
  )
    .moreThan(-1, persianTexts.error.addProducts.productOffPrice.moreThan)
    .integer(persianTexts.error.addProducts.productOffPrice.integer),
  productShortDescription: Yup.string()
    .required(persianTexts.error.addProducts.productShortDescription.required)
    .min(10),
  productFullDescription: Yup.string()
    .required(persianTexts.error.addProducts.productFullDescription.required)
    .min(20),
  productCover: Yup.mixed().required(
    persianTexts.error.addProducts.productCover.required
  ),
  productGallery: Yup.mixed().required(
    persianTexts.error.addProducts.productGallery.required
  ),
});
export const userRatingSchema = Yup.object().shape({
  userRating: Yup.number()
    .required(persianTexts.rating.userRating.required)
    .min(1, persianTexts.rating.userRating.min)
    .max(5, persianTexts.rating.userRating.max),
  userComment: Yup.string(persianTexts.rating.userComment.string)
    .required(persianTexts.rating.userComment.required)
    .min(5, persianTexts.rating.userComment.min),
});
