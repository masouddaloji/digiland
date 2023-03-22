export const persianTexts = {
  error: {
    register: {
      input: {
        phoneNumber: {
          required: "واردکردن شماره همراه اجباری می باشد",
          regex: "لطفا یک شماره همراه معتبر وارد کنید",
        },
        userName: {
          required: "واردکردن نام کاربری اجباری می باشد",
          regex: "لطفا یک نام کاربری معتبر وارد کنید",
          min: "حداقل طول نام کاربری 7 کاراکتر باشد",
          max: "حداکثر طول نام کاربری 25 کاراکتر باشد",
        },

        email: {
          required: "واردکردن ایمیل اجباری می باشد",
          regex: "لطفا یک ایمیل معتبر وارد کنید",
        },
        password: {
          required: "واردکردن رمزعبور اجباری می باشد",
          regex:
            "لطفا یک رمزعبور معتبر وارد کنید که شامل (حروف بزرگ و کوچک ،عدد،کاراکتر خاص) باشد",
          min: "حداقل طول رمزعبور 9 کاراکتر باشد",
          max: "حداکثر طول رمزعبور 25 کاراکتر باشد",
        },

        confirmPassword: {
          required: "واردکردن تکرار رمزعبور اجباری می باشد",
          regex: "رمزعبور و تکرار آن یکسان نیستند",
        },
      },
     
    },
    adminpanel: {
      products: "هیچ محصولی یافت نشد",
    },
    addProducts: {
      productTitle: {
        required: "وارد کردن نام محصول اجباری می باشد",
        min: "حداقل 4 کاراکتر وارد کنید",
      },
      productPrice: {
        required: "قیمت محصول را وارد کنید",
        moreThan: "کمترین قیمت 10,000 تومان می باشد",
        number: "قیمت محصول را بصورت عددی وارد کنید",
        integer: "قیمت را بصورت صحیح وارد کنید",
      },
      productRating: {
        number: "امتیاز محصول را بصورت عددی وارد کنید",
        moreThan: "امتیاز محصول باید بیشتر از 0 باشد",
        integer: "امتیاز را بصورت صحیح وارد کنید",
        required: "امتیاز محصول را وارد کنید",
      },
      productQantity: {
        number: "تعداد محصول را بصورت عددی وارد کنید",
        moreThan: "تعداد محصول باید بیشتر از 0 باشد",
        integer: "عدد را بصورت صحیح وارد کنید",
        required: "وارد کردن تعداد محصول اجباری می باشد",
      },
      productCategory: {
        required: "لطفا دسته بندی را انتخاب نمایید",
      },
      productSegment: {
        required: "وارد کردن بخش محصول الزامی می باشد",
      },
      productColors: {
        required: "لطفا رنگ های محصول را مشخص کنید",
        min:"حداقل یک رنگ را انتخاب کنید"
      },
      productBrand: {
        required: "لطفا برند محصول را مشخص کنید",
      },
      productOffPrice: {
        number: "درصد تخفیف را بصورت عدد وارد کنید",
        moreThan: "درصد تخفیف باید بیشتر از 0 باشد",
        integer: "درصد تخفیف را بصورت صحیح وارد کنید",
      },
      productShortDescription: {
        required: "لطفا توضیحات کوتاهی راجب محصول بنویسید",
        min: "حداقل 10 کاراکتر داشته باشد ",
      },
      productFullDescription: {
        required: "لطفا توضیحات کامل محصول را بنویسید",
        min: "حداقل 20 کاراکتر داشته باشد ",
      },
      productCover: {
        required: "انتخاب عکس اصلی محصول اجباری می باشد",
      },
      productGallery: {
        required: " مجموعه عکس های محصول را وارد کنید",
      },
    },
  },
  admin: {
    products: {
      label: {
        addProductsTitle: "افزودن محصول جدید",
        inputLabelTitle: "عنوان محصول",
        inputLabelPrice: "قیمت محصول",
        inputLabelRating: "امتیاز محصول",
        inputLabelQuantity: "تعداد محصول",
        inputLabelCategory: "دسته بندی محصول",
        inputLabelSegment: "نام مختصر محصول",
        inputLabelColors: "رنگ های محصول",
        inputLabelShortDescription: "توضیحات اجمالی محصول",
        inputLabelFullDescription: "توضیحات تکمیلی محصول",
        inputLabelBrand: "برند محصول",
        inputLabelOffPrice: "درصد تخفیف محصول",
        inputLabelCover: "کاور اصلی محصول",
        inputLabelGallery: "مجموعه عکس های محصول",
      },
      placeholder: {
        inputPlaceholderTitle: "گوشی سامسونگ s23 اولترا 256گیگ",
        inputPlaceholderPrice: "50,000,000",
        inputPlaceholderRating: 5,
        inputPlaceholderQuantity: 20,
        inputPlaceholderCategory: "گوشی تلفن همراه",
        inputPlaceholderSegment: "s23 ultra 256 gb",
        inputPlaceholderColors: "زرد قرمز سبز آبی",
        inputPlaceholderShortDescription: "توضیحات کوتاهی راجب محصول وارد کنید",
        inputPlaceholderFullDescription:
          "کلیه اطلاعات و توضیحات محصول را وارد کنید",
        inputPlaceholderBrand: "samsung",
        inputPlaceholderOffPrice: 15,
        inputPlaceholderCover: "لطفا عکس اصلی محصول را انتخاب کنید",
        inputPlaceholderGallery: "لطفا همه ی عکس های محصول را انتخاب کنید",
      },

      btn: "افزودن محصول",
    },
  },
  register:{
    registerSuccess:"شما با موفقیت عضو شدید لطفا وارد حساب خود شوید",
    registerError:"ثبت نام شما با مشکل مواجه شد لطفا دوباره تلاش کنید"
  },
  login:{
    logginSuccess:"شما با موفقیت وارد شدید",
    logginError:"ورود به حساب کاربری با مشکل مواجه شد لطفا دوباره تلاش کنید"
  }
};
