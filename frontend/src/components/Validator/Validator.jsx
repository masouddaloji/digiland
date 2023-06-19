// library
import * as Yup from "yup";
import { persianTexts } from "../../text";
// pattern
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
const phoneNumberPattern = /^(\+98|098|0|0098|98)?(9\d{9})$/;
const userNamePattern = /[A-Za-z0-9._]{8,25}/;
const passwordPattern =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%&*-+=:;,._₹]).{8,25}$/;
const postalCodePattern = /^\d{5}-?\d{5}$/;

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
export const checkInformationSchema = Yup.object().shape({
  checkFullName: Yup.string()
    .required(persianTexts.checkInformation.fullName.required)
    .min(6, persianTexts.checkInformation.fullName.min),
  checkProvince: Yup.string().required(
    persianTexts.checkInformation.province.required
  ),
  checkCity: Yup.string().required(persianTexts.checkInformation.city.required),
  checkAddress: Yup.string()
    .required(persianTexts.checkInformation.address.required)
    .min(8, persianTexts.checkInformation.address.min)
    .max(40, persianTexts.checkInformation.address.max),
  checkPostalCode: Yup.string()
    .required(persianTexts.checkInformation.postalCode.required)
    .matches(postalCodePattern, persianTexts.checkInformation.postalCode.match),
  checkTelephone: Yup.string()
    .required(persianTexts.checkInformation.telephone.required)
    .matches(phoneNumberPattern, persianTexts.checkInformation.telephone.match),
  acceptTerms: Yup.boolean()
    .required(persianTexts.checkInformation.acceptTerms.required)
    .oneOf([true], persianTexts.checkInformation.acceptTerms.required),
});
export const userUpdateSchema = Yup.object().shape({
  name: Yup.string(persianTexts.updateuserInfo.schema.name.string)
    .min(4, persianTexts.updateuserInfo.schema.name.min)
    .max(10, persianTexts.updateuserInfo.schema.name.max),
  image: Yup.string(),
  phone: Yup.string().matches(
    phoneNumberPattern,
    postalCodePattern,
    persianTexts.updateuserInfo.schema.phone.match
  ),
  state: Yup.string(),
  city: Yup.string(),
  street: Yup.string(persianTexts.updateuserInfo.schema.street.string).max(
    15,
    persianTexts.updateuserInfo.schema.street.max
  ),
  postalCode: Yup.string().matches(
    postalCodePattern,
    persianTexts.updateuserInfo.schema.postalCode
  ),
});
export const articleSchema = Yup.object().shape({
  articleTitle: Yup.string(persianTexts.addArticle.articleTitle.string)
    .required(persianTexts.addArticle.articleTitle.required)
    .min(5, persianTexts.addArticle.articleTitle.min),

  articleImage: Yup.string(persianTexts.addArticle.articleImage.string)
    .required(persianTexts.addArticle.articleImage.required),

  articleDescription: Yup.string(persianTexts.addArticle.articleDescription.string)
    .required(persianTexts.addArticle.articleDescription.required)
    .min(10, persianTexts.addArticle.articleDescription.min),

  articleWriter: Yup.string(persianTexts.addArticle.articleWriter.string)
    .required(persianTexts.addArticle.articleWriter.required)
    .min(5, persianTexts.addArticle.articleWriter.min),

  articleCategory: Yup.string(persianTexts.addArticle.articleCategory.string)
    .required(persianTexts.addArticle.articleCategory.required)
    .min(4, persianTexts.addArticle.articleCategory.min),
});
