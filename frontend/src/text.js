export const persianTexts={
    error:{
        register:{
            input:{
                phoneNumber:{
                    required:"واردکردن شماره همراه اجباری می باشد",
                    regex:"لطفا یک شماره همراه معتبر وارد کنید"
                }
                    ,
                userName:{
                    required:"واردکردن نام کاربری اجباری می باشد",
                    regex:"لطفا یک نام کاربری معتبر وارد کنید",
                    min:"حداقل طول نام کاربری 7 کاراکتر باشد",
                    max:"حداکثر طول نام کاربری 25 کاراکتر باشد"
                }
                
                ,
                email:{
                    required:"واردکردن ایمیل اجباری می باشد",
                    regex:"لطفا یک ایمیل معتبر وارد کنید"
                },
                password:{
                    required:"واردکردن رمزعبور اجباری می باشد",
                    regex:"لطفا یک رمزعبور معتبر وارد کنید که شامل (حروف بزرگ و کوچک ،عدد،کاراکتر خاص) باشد",
                    min:"حداقل طول رمزعبور 9 کاراکتر باشد",
                    max:"حداکثر طول رمزعبور 25 کاراکتر باشد"
                }
                
               ,
                confirmPassword:{
                    required:"واردکردن تکرار رمزعبور اجباری می باشد",
                    regex:"رمزعبور و تکرار آن یکسان نیستند"
                },

            }
        },
        adminpanel:{
            products:"هیچ محصولی یافت نشد"
        }
    },
    admin:{
        products:{
            label:{
            addProductsTitle:"افزودن محصول جدید",
            inputLabelTitle:"عنوان محصول",
            inputLabelPrice:"قیمت محصول",
            inputLabelRating:"امتیاز محصول",
            inputLabelQuantity:"تعداد محصول",
            inputLabelCategory:"دسته بندی محصول",
            inputLabelSegment:"نام مختصر محصول",
            inputLabelColors:"رنگ های محصول",
            inputLabelShortDescription:"توضیحات اجمالی محصول",
            inputLabelFullDescription:"توضیحات تکمیلی محصول",
            inputLabelBrand:"برند محصول",
            inputLabelOffPrice:"درصد تخفیف محصول",
            inputLabelCover:"کاور اصلی محصول",
            inputLabelGallery:"مجموعه عکس های محصول",
            },
            placeholder:{
            inputPlaceholderTitle:"گوشی سامسونگ s23 اولترا 256گیگ",
            inputPlaceholderPrice:"50,000,000",
            inputPlaceholderRating:"5",
            inputPlaceholderQuantity:"23",
            inputPlaceholderCategory:"گوشی تلفن همراه",
            inputPlaceholderSegment:"s23 ultra 256 gb",
            inputPlaceholderColors:"زرد قرمز سبز آبی",
            inputPlaceholderShortDescription:"توضیحات کوتاهی راجب محصول وارد کنید",
            inputPlaceholderFullDescription:"کلیه اطلاعات و توضیحات محصول را وارد کنید",
            inputPlaceholderBrand:"samsung",
            inputPlaceholderOffPrice:"20",
            },
            btn:"افزودن محصول"
        }
    }
}