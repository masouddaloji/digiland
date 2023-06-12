export const persianTexts = {
  adminpanel: {
    productsNotFound: "هیچ محصولی یافت نشد",
  },
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
        required: "لطفا دسته بندی محصول را مشخص کنید",
      },
      productSegment: {
        required: "وارد کردن نام مختصر محصول الزامی می باشد",
      },
      productColors: {
        required: "لطفا رنگ های محصول را مشخص کنید",
        min: "حداقل یک رنگ را انتخاب کنید",
        max: "حداکثر سه رنگ می توانید انتخاب کنید",
      },
      productBrand: {
        required: "لطفا برند محصول را مشخص کنید",
      },
      productSubCategory: {
        required: "لطفا زیر مجوعه را انتخاب نمایید",
      },
      productOffPrice: {
        number: "درصد تخفیف را بصورت عدد وارد کنید",
        moreThan: "درصد تخفیف باید بیشتر از 0 باشد",
        integer: "درصد تخفیف را بصورت صحیح وارد کنید",
      },
      productShortDescription: {
        required: "لطفا توضیحاتی  راجب محصول بنویسید",
        min: "حداقل 10 کاراکتر داشته باشد ",
      },
      productFullDescription: {
        required: "لطفا اطلاعات کامل محصول را بنویسید",
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
        inputLabelTitle: "عنوان محصول",
        inputLabelPrice: "قیمت محصول",
        inputLabelRating: "امتیاز محصول",
        inputLabelQuantity: "تعداد محصول",
        inputLabelCategory: "دسته بندی محصول",
        inputLabelSubCategory: "زیر مجموعه محصول",
        inputLabelSegment: "نام مختصر محصول",
        inputLabelColors: "رنگ های محصول",
        inputLabelShortDescription: "توضیحات محصول",
        inputLabelFullDescription: "اطلاعات محصول",
        inputLabelBrand: "برند محصول",
        inputLabelOffPrice: "تخفیف محصول",
        inputLabelCover: "کاور محصول",
        inputLabelGallery: "عکس های محصول",
      },
      placeholder: {
        inputPlaceholderTitle: "گوشی سامسونگ s23 اولترا 256گیگ",
        inputPlaceholderPrice: "50,000,000",
        inputPlaceholderRating: "امتیاز محصول را انتخاب کنید",
        inputPlaceholderQuantity: 20,
        inputPlaceholderCategory: "الکترونیک",
        inputPlaceholderSubCategory: "موبایل",
        inputPlaceholderSegment: "s23 ultra 256 gb",
        inputPlaceholderColors: "رنگ های محصول را انتخاب کنید",
        inputPlaceholderShortDescription: "توضیحات محصول را وارد کنید",
        inputPlaceholderFullDescription: "اطلاعات محصول را وارد کنید",
        inputPlaceholderBrand: "samsung",
        inputPlaceholderOffPrice: 15,
        inputPlaceholderCover: "کاور محصول را انتخاب کنید",
        inputPlaceholderGallery: "عکس های محصول را انتخاب کنید",
      },
    },
  },
  register: {
    registerSuccess: "شما با موفقیت عضو شدید لطفا وارد حساب خود شوید",
    registerError: "ثبت نام شما با مشکل مواجه شد لطفا دوباره تلاش کنید",
  },
  login: {
    logginSuccess: "شما با موفقیت وارد شدید",
    loginNotMatch: "نام کاربری یا رمز عبور اشتباه است",
    logginError: "ورود به حساب کاربری با مشکل مواجه شد لطفا دوباره تلاش کنید",
  },
  productInfo: {
    warning: `هشدار سامانه همتا: در صورت انجام معامله، از فروشنده کد
    فعالسازی را گرفته و حتما در حضور ایشان، دستگاه را از
    طریق #7777*، برای سیمکارت خود فعالسازی نمایید. آموزش
    تصویری در آدرس اینترنتی hmti.ir/06 امکان برگشت کالا در
    گروه موبایل با دلیل انصراف از خرید تنها در صورتی مورد
    قبول است که پلمپ کالا باز نشده باشد.`,
    commentRules:
      "خلاصه قوانین زیر را مطالعه کنید:<br /><br /> فارسی بنویسید و از کیبورد فارسی استفاده کنید. بهتر است از فضای خالی (Space) بیش&zwnj;از&zwnj;حدِ معمول، شکلک یا ایموجی استفاده نکنید و از کشیدن حروف یا کلمات با صفحه&zwnj;کلید بپرهیزید.<br /><br /> نظرات خود را براساس تجربه و استفاده&zwnj;ی عملی و با دقت به نکات فنی ارسال کنید؛ بدون تعصب به محصول خاص، مزایا و معایب را بازگو کنید و بهتر است از ارسال نظرات چندکلمه&zwnj;&zwnj;ای خودداری کنید.<br /><br /> بهتر است در نظرات خود از تمرکز روی عناصر متغیر مثل قیمت، پرهیز کنید.<br /><br /> به کاربران و سایر اشخاص احترام بگذارید. پیام&zwnj;هایی که شامل محتوای توهین&zwnj;آمیز و کلمات نامناسب باشند، حذف می&zwnj;شوند.",
    firstTologin: "ابتدا وارد حساب کاربری خود شوید",
    notFindReviews: "هیچ نظری یافت نشد",
    productRatingFromUsers: "امتیاز کالا از دیدگاه کاربران",
  },
  useLogout: {
    logoutSuccess: "شما با موفقیت از حساب خود خارج شدید",
    logoutError: "خروج از حساب با مشکل مواجه شد لطفا دوباره تلاش نمایید",
  },
  rating: {
    userRating: {
      required: "امتیاز دادن به محصول مورد نظر الزامی می باشد",
      min: "حداقل امتیاز بک می باشد",
      max: "حداکثر امتیاز پنج می باشد",
    },
    userComment: {
      string: "لطفا کامنت خود را بصورت متن وارد کنید",
      required: "وارد کردن کامنت الزامی میباشد",
      min: "حداقل تعداد کاراکتر 8 می باشد",
    },
    submit: {
      success: "امتیاز شما با موفقیت ثبت شد",
      error: "ثبت امتیاز شما با مشکل مواجه شد لطفا دوباره تلاش نمایید",
      warning: "برای امتیاز دادن ابتدا وارد حساب کاربری خود بشوید",
    },
  },
  header: {
    notLoginInBasket: "لطفا وارد حساب کاربری خود شوید",
  },
  productsCategory: {
    noProducts: "محصولی پیدا نشد",
    noResponse: "خطا در ارتباط با سرور",
  },
  basket: {
    basketBtn: "ادامه جهت تسویه حساب",
    emptyBasket: "سبد خرید شما خالی می باشد",
    addtobasketSuccess: "محصول مورد نظر به سبد خرید شما افزوده شد",
    addtobasketError: "افزودن محصول مورد نظر به سبد خرید با مشکل مواجه شد",
    removeFromBasketSuccess: "محصول مورد نظر با موفقیت از سبد خرید حذف شد",
    removeFromBasketError:
      "حذف محصول از سبد خرید با مشکل مواجه شد لطفا دوباره تلاش نمایید",
    incrementProductError:
      "افزایش تعداد محصول در سبد خرید با مشکل مواجه شد لطفا دوباره تلاش نمایید",
    decrementProductError:
      "کاهش تعداد محصول در سبد خرید با مشکل مواجه شد لطفا دوباره تلاش نمایید",
  },
  checkInformation: {
    fullName: {
      required: "لطفا نام و نام خانوادگی را وارد کنید",
      min: "حداقل تعداد کاراکتر 6 می باشد",
    },
    province: {
      required: "لطفا استان خود را انتخاب کنید",
    },
    city: {
      required: "لطفا شهر خود را انتخاب کنید",
    },
    address: {
      required: "لطفا آدرس خود را وارد کنید",
      min: "حداقل تعداد کاراکتر 8 می باشد",
      max: "حداکثر تعداد کاراکتر 40 می باشد",
    },
    postalCode: {
      required: "لطفا کدپستی خود را وارد کنید",
      match: "لطفا یک کدپستی معتبر وارد کنید",
    },
    telephone: {
      required: "لطفا شماره تلفن خود را وارد کنید",
      match: "لطفا یک شماره تلفن معتبر وارد کنید",
    },
    acceptTerms: {
      required: "شما باید قوانین سایت را بپذیرید",
    },
  },
  uploader: {
    productMulti: {
      success: "عکس های محصول آپلود شدند",
      error: "آپلود عکس های محصول با مشکل مواجه شد لطفا دوباره تلاش کنید",
    },
    productsingle: {
      success: "کاور محصول آپلود شد",
      error: "آپلود کاور با مشکل مواجه شد لطفا دوباره تلاش کنید",
    },
    profile: {
      success: "عکس پروفایل آپلود شد",
      error: "مشکلی در آپلود عکس پروفایل پیش آمد",
    },
  },
  addProducts: {
    createProductSuccess: "افزودن محصول با موفقیت انجام شد",
    createProductError: "خطایی در افزودن محصول جدید رخ داد",
    submitBtn: "افزودن محصول",
    returntoProductPage: "صفحه محصولات",
    header: "افزودن محصول",
  },
  editProduct: {
    submitBtn: "اعمال تغییرات",
    editProductSuccess: "ویرایش موفقیت‌آمیز اطلاعات محصول",
    editProductError: "ویرایش اطلاعات محصول دچار مشکل شد",
    returntoProductPage: "صفحه محصولات",
    header: "ویرایش اطلاعات محصول",
  },

  adminProduct: {
    deleteModalTitle: "آیا مایل به ویرایش محصول موردنظر هستید؟",
    editModalTitle: "آیا مایل به حذف محصول موردنظر هستید؟",
    deleteProduct: {
      removeProductSuccess: "محصول مورد نظر با موفقیت حذف شد",
      removeProductError:
        "مشکلی در حذف محصول به وجود آمده، لطفاً دوباره تلاش کنید",
    },
  },
  favorite: {
    header: "محصولات مورد علاقه",
    showBtn: "مشاهده",
    deleteBtn: "حذف",
    addtoFavorite:{
      success: "محصول انتخابی به لیست علاقه‌مندی‌های شما افزوده شد.",
      error:"اضافه کردن محصول به لیست علاقه‌مندی‌ها با مشکل مواجه شد.",
    },
    removeFromFavorite:{
      success:"محصول انتخابی با موفقیت از لیست علاقه‌مندی‌های شما حذف شد.",
      error:"مشکلی در حذف محصول از لیست علاقه‌مندی‌ها وجود دارد. "
    }
  },
  address: {
    description: "آدرس ثبت شده ی شما به شرح زیر است",
    listHeader: "آدرس حمل و نقل",
    link: "ویرایش",
  },
  updateuserInfo: {
    schema: {
      name: {
        string: "لطفا نام را بصورت متن وارد کنید",
        min: "حداقل کاراکتر 4 می باشد",
        max: "حداکثر کاراکتر 10 می باشد",
      },
      image: {},
      phone: {
        match: "لطفا شماره تلفن معتبر وارد کنید",
      },
      street: {
        max: "حداکثر 15 کاراکتر وارد کنید",
        string: "لطفا آدرس خیابان را بصورت متن صحیح وارد کنید",
      },
      postalCode: "لطفا کد پستی معتبر وارد کنید",
    },
    submitBtn: "ذخیره تغییرات",
    uploaderPlaceholder: "لطفا عکس پروفایل را انتخاب کنید",
  },
};
