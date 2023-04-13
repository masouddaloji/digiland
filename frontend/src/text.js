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
        min:"حداقل یک رنگ را انتخاب کنید",
        max:"حداکثر سه رنگ می توانید انتخاب کنید"
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
        addProductsTitle: "افزودن محصول جدید",
        inputLabelTitle: "عنوان محصول",
        inputLabelPrice: "قیمت محصول",
        inputLabelRating: "امتیاز محصول",
        inputLabelQuantity: "تعداد محصول",
        inputLabelCategory: "دسته بندی محصول",
        inputLabelSegment: "نام مختصر محصول",
        inputLabelColors: "رنگ های محصول",
        inputLabelShortDescription: "توضیحات محصول",
        inputLabelFullDescription: "اطلاعات محصول",
        inputLabelBrand: "برند محصول",
        inputLabelOffPrice: "درصد تخفیف محصول",
        inputLabelCover: "کاور اصلی محصول",
        inputLabelGallery: "مجموعه عکس های محصول",
      },
      placeholder: {
        inputPlaceholderTitle: "گوشی سامسونگ s23 اولترا 256گیگ",
        inputPlaceholderPrice: "50,000,000",
        inputPlaceholderRating: "لطفا امتیاز محصول را انتخاب کنید",
        inputPlaceholderQuantity: 20,
        inputPlaceholderCategory: "موبایل",
        inputPlaceholderSegment: "s23 ultra 256 gb",
        inputPlaceholderColors: "لطفا رنگ های محصول را انتخاب کنید",
        inputPlaceholderShortDescription: "لطفا توضیحات محصول را وارد کنید",
        inputPlaceholderFullDescription:
          "لطفا اطلاعات محصول را وارد کنید",
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
    loginNotMatch:"نام کاربری یا رمز عبور اشتباه است",
    logginError:"ورود به حساب کاربری با مشکل مواجه شد لطفا دوباره تلاش کنید"
  },
  productInfo:{
    warning:`هشدار سامانه همتا: در صورت انجام معامله، از فروشنده کد
    فعالسازی را گرفته و حتما در حضور ایشان، دستگاه را از
    طریق #7777*، برای سیمکارت خود فعالسازی نمایید. آموزش
    تصویری در آدرس اینترنتی hmti.ir/06 امکان برگشت کالا در
    گروه موبایل با دلیل انصراف از خرید تنها در صورتی مورد
    قبول است که پلمپ کالا باز نشده باشد.`,
    commentRules:`لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه
    کنید:\ فارسی بنویسید و از کیبورد فارسی استفاده کنید. بهتر
    است از فضای خالی (Space) بیش‌از‌حدِ معمول، شکلک یا
    ایموجی استفاده نکنید و از کشیدن حروف یا کلمات با
    صفحه‌کلید بپرهیزید.\ نظرات خود را براساس تجربه و استفاده‌ی عملی و با دقت
    به نکات فنی ارسال کنید؛ بدون تعصب به محصول خاص،
    مزایا و معایب را بازگو کنید و بهتر است از ارسال
    نظرات چندکلمه‌‌ای خودداری کنید.\ بهتر است در نظرات خود از تمرکز روی عناصر متغیر مثل
    قیمت، پرهیز کنید.\ به کاربران و سایر اشخاص احترام بگذارید. پیام‌هایی که
    شامل محتوای توهین‌آمیز و کلمات نامناسب باشند، حذف
    می‌شوند.`,
    addtobasketSuccess:"محصول مورد نظر به سبد خرید شما افزوده شد",
    addtobasketError:"افزودن محصول مورد نظر به سبد خرید با مشکل مواجه شد",
    firstTologin:"ابتدا وارد حساب کاربری خود شوید"
  },
  useLogout:{
    logoutSuccess:"شما با موفقیت از حساب خود خارج شدید",
    logoutError:"خروج از حساب با مشکل مواجه شد لطفا دوباره تلاش نمایید"
  }
};
