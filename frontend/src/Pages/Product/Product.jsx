import React, {  useEffect, useRef, useState } from "react";
//packages
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Thumbs, Zoom } from "swiper";
import domPurify from 'dompurify'
//components
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import ProductCart from "../../components/ProductCart/ProductCart";
import ProductCount from "../../components/ProductCount/ProductCount";
import InputRating from "../../components/InputRating/InputRating";
import axios from "../../api/axios";
import Slider from "../../components/Slider/Slider";

//icons
import { TfiSearch } from "react-icons/tfi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { HiOutlineBellAlert } from "react-icons/hi2";
import {
  AiOutlinePlusCircle,
  AiOutlineRetweet,
  AiOutlineStar,
} from "react-icons/ai";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import {
  BiCalendarCheck,
  BiCheckSquare,
  BiCommentDetail,
} from "react-icons/bi";
import { RiTruckLine } from "react-icons/ri";
import { BsCheck, BsPen, BsSortDown, BsQuestionSquare } from "react-icons/bs";
import { IoMdClose, IoMdHeartEmpty } from "react-icons/io";
import { CgChevronLeftO, CgList } from "react-icons/cg";
import { TbChecklist, TbTriangle, TbTriangleInverted } from "react-icons/tb";
//styles//
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import "./Product.css";


export default function Product() {
  const [detailsProduct, setDetailsProduct] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeThumbs, setActiveThumbs] = useState();
  const { productId } = useParams();
  const [productCount, setProductCount] = useState(1);
  const [active, setActive] = useState("description");
  const [advantagesLists, setAdvantagesLists] = useState([]);
  const [disadvantagesLists, setDisadvantagesLists] = useState([]);
  const [currentAdvantages, setCurrentAdvantages] = useState("");
  const [currentDisadvantages, setCurrentDisadvantages] = useState("");
  const [isShowAddBtnAdvantages, setIsShowAddBtnAdvantages] = useState(false);
  const [isShowAddBtnDisadvantages, setIsShowAddBtnDisadvantages] =
    useState(false);
  const [advantagesError, setAdvantagesError] = useState(false);
  const [disadvantagesError, setDisadvantagesError] = useState(false);
  const [magnifyStyle, setMagnifyStyle] = useState({
    backgroundImage: `url(/images/phone/samsung/13promax-2.jpg)`,});
  const maxValue = 10;

  const allInfosBtn = [
    { id: 1, titleFa: "توضیحات", titleEn: "description" },
    { id: 2, titleFa: "مشخصات", titleEn: "specifications" },
    { id: 3, titleFa: "نظرات کاربران", titleEn: "userComments" },
    { id: 4, titleFa: "سوالات کاربران", titleEn: "userQuestions" },
    { id: 5, titleFa: " نقد و بررسی", titleEn: "review" },
  ];
  const optionRef = useRef();
  const addAdvantages = () => {
    if (currentAdvantages.trim().length > 3) {
      const newAdvantages = {
        id: advantagesLists.length
          ? advantagesLists[advantagesLists.length - 1].id + 1
          : advantagesLists.length + 1,
        title: currentAdvantages,
      };
      setAdvantagesLists((prevValues) => [...prevValues, newAdvantages]);
      setCurrentAdvantages("");
    } else {
      setAdvantagesError(true);
      setTimeout(() => setAdvantagesError(false), 3000);
    }
  };
  const addDisadvantages = () => {
    if (currentDisadvantages.trim().length > 3) {
      const newDisadvantages = {
        id: disadvantagesLists.length
          ? disadvantagesLists[disadvantagesLists.length - 1].id + 1
          : disadvantagesLists.length + 1,
        title: currentDisadvantages,
      };
      setDisadvantagesLists((prevValues) => [...prevValues, newDisadvantages]);
      setCurrentDisadvantages("");
    } else {
      setDisadvantagesError(true);
      setTimeout(() => setDisadvantagesError(false), 3000);
    }
  };

  const removeAdvantages = (pointID) => {
    setAdvantagesLists(advantagesLists.filter((item) => item.id !== pointID));
  };
  const removeDisadvantages = (pointID) => {
    setDisadvantagesLists(
      disadvantagesLists.filter((item) => item.id !== pointID)
    );
  };
  const mouseMoveHandler = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;
    const xPercent = (offsetX / offsetWidth) * 100;
    const yPercent = (offsetY / offsetHeight) * 100;
    setMagnifyStyle((prev) => ({
      ...prev,
      visibility: "visible",
      opacity: "1",
      top: `${offsetY - 90}px`,
      left: `${offsetX - 90}px`,
      backgroundPosition: `${xPercent}% ${yPercent}%`,
    }));
  };
  const mouseLeaveHandler = (e) => {
    setMagnifyStyle((prev) => ({
      ...prev,
      visibility: "hidden",
      opacity: "0",
    }));
  };
  useEffect(()=>{
    console.log("productId",productId)
    axios.get(`products/reviews/${productId}`)
    .then(res=>setDetailsProduct(res?.data?.data))
    .catch(error=>console.log(error))
  },[])
  return (
    <div className="product">
      <div className="container">
      {/* bread crumbs */}
        {/* <Breadcrumb /> */}
        <div className="product__wrapper">
          <div className="row">
            <div className="col-4">
              <div className="product__imagesBox">
                <div className="product__largeImageBox">
                {/* <Slider  space={15} isLoop={true} isNavigation={true} array={detailsProduct?.gallery} slide="image"/> */}
                  <Swiper
                    dir="rtl"
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation, Thumbs, Zoom]}
                    grabCursor={true}
                    zoom={{ maxRatio: 5, minRatio: 1 }}
                    thumbs={{ swiper: activeThumbs }}
                    className="mySwiper"
                  >
                  {detailsProduct?.gallery?.map((item,index)=> <SwiperSlide key={index+1}>
                      <div className="largImage__wrapper">
                        <img
                          src={`http://localhost:8000${item}`}
                          alt="product image"
                          className="product__smallImage"
                          onMouseMove={mouseMoveHandler}
                          onMouseLeave={mouseLeaveHandler}
                          onTouchMove={mouseMoveHandler}
                          onTouchEnd={mouseLeaveHandler}
                          draggable={false}
                        />
                        <div className="zoomImage" style={magnifyStyle}></div>
                      </div>
                    </SwiperSlide> )}
                  </Swiper>
                  <div className="product__fullScrennImage">
                    <TfiSearch className="product__icon" />
                  </div>
                </div>
                <div className="product__smallImagesWrapper">
                  <Swiper
                    onSwiper={setActiveThumbs}
                    dir="rtl"
                    loop={true}
                    slidesPerView={4}
                    spaceBetween={10}
                    modules={[Navigation, Thumbs]}
                    className="mySwiper swiperThumbs"
                  >
                   {detailsProduct?.gallery?.map((item,index)=> <SwiperSlide key={index+1}>
                      <div className={`product__smallImagesBox`}>
                        <img
                          src={`http://localhost:8000${item}`}
                          alt="product image"
                          className="product__smallImage"
                        />
                      </div>
                    </SwiperSlide>)}
                    
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="product__detailsBox">
                <h2 className="product__detailsTitle">
                  {detailsProduct?.title}
                </h2>
                <span className="product__detailsSubtitle">
                  Xiaomi POCO X3 Pro M2102J20SG Dual SIM 256GB And 8GB RAM
                  Mobile Phone
                </span>
                <div className="product__detailsMeta">
                  <span className="product__detailsMetainfo">دسته : </span>
                  <span className="product__detailsMetainfo">
                    <Link to="/">موبایل</Link>
                  </span>
                </div>
                <ul className="product__detailsListInfos">
                  <li className="product__detailsItemInfos">
                    <span className="product__infosQuest">حافظه داخلي : </span>
                    <span className="product__infosAnswer">256 گيگابايت</span>
                  </li>
                  <li className="product__detailsItemInfos">
                    <span className="product__infosQuest">
                      تعداد سيم کارت :{" "}
                    </span>
                    <span className="product__infosAnswer">دو سيم کارت</span>
                  </li>
                  <li className="product__detailsItemInfos">
                    <span className="product__infosQuest">حس‌گرها : </span>
                    <span className="product__infosAnswer">
                      قطب‌نما (Compass)، شتاب‌سنج (Accelerometer)، مجاورت
                      (Proximity)، ژيروسکوپ (Gyro)
                    </span>
                  </li>
                  <li className="product__detailsItemInfos">
                    <span className="product__infosQuest">
                      شبکه هاي ارتباطي :{" "}
                    </span>
                    <span className="product__infosAnswer">2G، 3G، 4G</span>
                  </li>
                </ul>
                <div className="product__priceRange">
                  <bdi className="product__prices">{detailsProduct?.price?.toLocaleString()}
                  <span className="toman">تومان</span>
                  </bdi>
                  {detailsProduct?.offPrice?
                  <>
                  <i>|</i>
                  <bdi className="product__prices">25,600,000
                  <span className="toman">تومان</span>
                  </bdi>
                  </> 
                  : null}
                 
                  
                </div>
                {/* select colors product */}
                <div className="product__colorBox">
                  <div className="product__currentColor">
                    <span> رنگ : </span>
                    <span> آبی </span>
                  </div>

                  <div className="product__allColors">
                  {detailsProduct?.colors?.map(color=><div>
                      <span className="product__colorTitle">{color}</span>
                      <span className="product__color" data-color={color}></span>
                    </div>)}
                    
                  </div>
                  <div className="product__currentPrice">
                    <bdi className="product__prices">25,600,000
                    <span className="toman">تومان</span>
                    </bdi>
                    
                  </div>
                </div>
                <div className="product__countAdd">
                  <ProductCount value={productCount} minValue={1} maxValue={10} newValue={setProductCount} />
                  <button className="product__addToBasket">
                    <MdOutlineAddShoppingCart className="product__addIcon" />
                    افزودن به سبد خرید
                  </button>
                </div>

                <div className="product__warning">
                  <p className="product__warningText">
                    <HiOutlineBellAlert className="product__warningIcon" />
                    هشدار سامانه همتا: در صورت انجام معامله، از فروشنده کد
                    فعالسازی را گرفته و حتما در حضور ایشان، دستگاه را از طریق
                    #7777*، برای سیمکارت خود فعالسازی نمایید. آموزش تصویری در
                    آدرس اینترنتی hmti.ir/06 امکان برگشت کالا در گروه موبایل با
                    دلیل "انصراف از خرید" تنها در صورتی مورد قبول است که پلمپ
                    کالا باز نشده باشد.
                  </p>
                </div>
              </div>
            </div>
            {/* colors */}
            <div className="col-3">
              <div className="product__availbleBox">
                <div className="product__availbleWrapper">
                  <div className="product__availbleItem blue">
                    <BiCalendarCheck className="product__availbleItemIcon blue" />
                    تاریخ بروزرسانی :<span>17 تیر 1401</span>
                  </div>
                  <div className="product__availbleItem">
                  {/* {detailsProduct?.} */}
                    <BiCheckSquare className="product__availbleItemIcon available" />
                    موجود است
                  </div>
                  <div className="product__availbleItem">
                    <RiTruckLine className="product__availbleItemIcon truck" />
                    ارسال از <span>3</span> روز کاری آینده
                  </div>
                  <div className="product__btnWapper">
                    <div className="product__availbleItem">
                      <button className="product__availbleButton">
                        <BsCheck className="product__availbleBtnIcon" />
                        مقایسه
                      </button>
                    </div>
                    <div className="product__availbleItem">
                      <button className="product__availbleButton">
                        <IoMdHeartEmpty className="product__availbleBtnIcon" />
                        افزودن به علاقه مندی ها
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product__services">
                  <div className="product__servicesItem">
                    <img
                      src="/images/productservices/1.png"
                      alt=""
                      className="product__servicesImg"
                    />
                    تضمین بهترین قیمت
                  </div>
                  <div className="product__servicesItem">
                    <img
                      src="/images/productservices/2.png"
                      alt=""
                      className="product__servicesImg"
                    />
                    ضمانت اصل بودن
                  </div>
                  <div className="product__servicesItem">
                    <img
                      src="/images/productservices/3.webp"
                      alt=""
                      className="product__servicesImg"
                    />
                    تحویل اکسپرس
                  </div>
                  <div className="product__servicesItem">
                    <img
                      src="/images/productservices/4.webp"
                      alt=""
                      className="product__servicesImg"
                    />
                    بسته بندی زیبا
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="product__tabListWrapper">
            <ul className="product__tabList">
              {allInfosBtn.map((btn) => (
                <li className="product__tabItem" key={btn.id}>
                  <Link
                    className={`product__tabLink ${
                      active === btn.titleEn ? "product__tabLink--active" : ""
                    }`}
                    to="#"
                    onClick={() => setActive(btn.titleEn)}
                  >
                    {btn.titleFa}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="product__wrapper">
          <div className="row">
            {/* Description */}
            <div
              className={`allDetails ${
                active === "description" ? "allDetails--show" : ""
              }`}
            >
              <div className="allDetails__headingWrapper">
                <BsPen className="allDetails__headingIcon" />
                <div className="allDetails__headingLeft">
                  <span className="allDetails__headingTitle">
                    نقد و بررسی اجمالی
                  </span>
                  <span className="allDetails__headingDesc">
                   {detailsProduct?.title}
                  </span>
                </div>
              </div>
              <div className="allDetails__detailsBox">
                <p className="allDetails__detailsText">
                {detailsProduct?.shortDescription}
                </p>
              </div>
            </div>
            {/* specifications */}
            <div
              className={`allDetails ${
                active === "specifications" ? "allDetails--show" : ""
              }`}
            >
              <div className="allDetails__headingWrapper">
                <CgList className="allDetails__headingIcon" />
                <div className="allDetails__headingLeft">
                  <span className="allDetails__headingTitle">مشخصات کلی</span>
                  <span className="allDetails__headingDesc">
                    Xiaomi POCO X3 Pro M2102J20SG Dual SIM 256GB And 8GB RAM
                    Mobile Phone
                  </span>
                </div>
              </div>
              <div className="details__tableWrapper" dangerouslySetInnerHTML={{__html:domPurify.sanitize(detailsProduct?.fullDescription)}}></div>
              {/* <table className="productsTable">
                <tbody>
                  <tr className="productsTable__mainHeader">
                    <th>
                      <CgChevronLeftO className="productsTable__icon" />
                      حافظه
                    </th>
                  </tr>
                  <tr className="productsTable__rowInfos">
                    <td>
                      <table className="innerTable">
                        <tbody>
                          <tr className="innerTable__row">
                            <th className="innerTable__attributesName">
                              حافظه داخلي
                            </th>
                            <td className="innerTable__attributesInfo">
                              <p>64 گيگابايت</p>
                            </td>
                          </tr>
                          <tr className="innerTable__row">
                            <th className="innerTable__attributesName">
                              پشتيباني از کارت حافظه جانبي
                            </th>
                            <td className="innerTable__attributesInfo">
                              <p>128 گيگابايت microSD</p>
                            </td>
                          </tr>
                          <tr className="innerTable__row">
                            <th className="innerTable__attributesName">
                              مقدار RAM
                            </th>
                            <td className="innerTable__attributesInfo">
                              <p>3 گيگابايت</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr className="productsTable__mainHeader">
                    <th>
                      <CgChevronLeftO className="productsTable__icon" />
                      صفحه نمایش
                    </th>
                  </tr>
                  <tr className="productsTable__rowInfos">
                    <td>
                      <table className="innerTable">
                        <tbody>
                          <tr className="innerTable__row">
                            <th className="innerTable__attributesName">
                              ابعاد
                            </th>
                            <td className="innerTable__attributesInfo">
                              <p> 13 × 80 × 158.6 ميلي‌متر</p>
                            </td>
                          </tr>
                          <tr className="innerTable__row">
                            <th className="innerTable__attributesName">
                              نوع صفحه نمایش
                            </th>
                            <td className="innerTable__attributesInfo">
                              <p>LCD</p>
                            </td>
                          </tr>
                          <tr className="innerTable__row">
                            <th className="innerTable__attributesName">
                              اندازه صفحه نمایش
                            </th>
                            <td className="innerTable__attributesInfo">
                              <p>5.0اينچ</p>
                            </td>
                          </tr>
                          <tr className="innerTable__row">
                            <th className="innerTable__attributesName">
                              رزولوشن
                            </th>
                            <td className="innerTable__attributesInfo">
                              <p>1080 × 1920 FullHD</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table> */}
            </div>
            {/* start userComments */}
            <div
              className={`allDetails ${
                active === "userComments" ? "allDetails--show" : ""
              }`}
            >
              <div className="allDetails__headingWrapper">
                <BiCommentDetail className="allDetails__headingIcon" />
                <div className="allDetails__headingLeft">
                  <span className="allDetails__headingTitle">
                    نظرات کاربران
                  </span>
                  <span className="allDetails__headingDesc">
                    Xiaomi POCO X3 Pro M2102J20SG Dual SIM 256GB And 8GB RAM
                    Mobile Phone
                  </span>
                </div>
              </div>
              <div className="userComments__wrapper">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="userComments__reviewRules">
                      <p className="userComments__rulesText">
                        لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه کنید:
                        <br />
                        فارسی بنویسید و از کیبورد فارسی استفاده کنید. بهتر است
                        از فضای خالی (Space) بیش‌از‌حدِ معمول، شکلک یا ایموجی
                        استفاده نکنید و از کشیدن حروف یا کلمات با صفحه‌کلید
                        بپرهیزید.
                        <br />
                        نظرات خود را براساس تجربه و استفاده‌ی عملی و با دقت به
                        نکات فنی ارسال کنید؛ بدون تعصب به محصول خاص، مزایا و
                        معایب را بازگو کنید و بهتر است از ارسال نظرات
                        چندکلمه‌‌ای خودداری کنید.
                        <br />
                        بهتر است در نظرات خود از تمرکز روی عناصر متغیر مثل قیمت،
                        پرهیز کنید.
                        <br />
                        به کاربران و سایر اشخاص احترام بگذارید. پیام‌هایی که
                        شامل محتوای توهین‌آمیز و کلمات نامناسب باشند، حذف
                        می‌شوند.
                      </p>
                    </div>
                    <div className="resultReview__wrraper">
                      <h3 className="resultReview__title">
                        امتیاز کاربران <span>3.9</span> از <span>2</span> دیدگاه
                      </h3>
                      <div className="resultReview__points">
                        <div className="resultReview__point">
                          <span className="resultReview__pointTitle">
                            کیفیت ساخت
                          </span>
                          <div className="resultReview__pointWrapper">
                            <div className="resultReview__pointProgress">
                              <span className="resultReview__pointProgressBar"></span>
                            </div>
                            <span className="resultReview__pointResultText">
                              خوب
                            </span>
                          </div>
                        </div>
                        <div className="resultReview__point">
                          <span className="resultReview__pointTitle">
                            ارزش خرید به نسبت قیمت
                          </span>
                          <div className="resultReview__pointWrapper">
                            <div className="resultReview__pointProgress">
                              <span className="resultReview__pointProgressBar"></span>
                            </div>
                            <span className="resultReview__pointResultText">
                              خوب
                            </span>
                          </div>
                        </div>
                        <div className="resultReview__point">
                          <span className="resultReview__pointTitle">
                            نوآوری
                          </span>
                          <div className="resultReview__pointWrapper">
                            <div className="resultReview__pointProgress">
                              <span className="resultReview__pointProgressBar"></span>
                            </div>
                            <span className="resultReview__pointResultText">
                              خوب
                            </span>
                          </div>
                        </div>
                        <div className="resultReview__point">
                          <span className="resultReview__pointTitle">
                            امکانات و قابلیت ها
                          </span>
                          <div className="resultReview__pointWrapper">
                            <div className="resultReview__pointProgress">
                              <span className="resultReview__pointProgressBar"></span>
                            </div>
                            <span className="resultReview__pointResultText">
                              خوب
                            </span>
                          </div>
                        </div>
                        <div className="resultReview__point">
                          <span className="resultReview__pointTitle">
                            سهولت استفاده
                          </span>
                          <div className="resultReview__pointWrapper">
                            <div className="resultReview__pointProgress">
                              <span className="resultReview__pointProgressBar"></span>
                            </div>
                            <span className="resultReview__pointResultText">
                              خوب
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="reviewForm__wrapper">
                      <div className="reviewForm">
                        <span className="reviewForm__title">
                          دیدگاه خود را بنویسید
                        </span>
                        <form
                          className="reviewForm__form"
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <div className="reviewForm__ratingWrapper">
                            <label className="reviewForm__ratingTitle">
                              امتیاز شما
                            </label>
                            <div className="reviewForm__ratingStars">
                              <AiOutlineStar className="reviewForm__ratingStar" />
                              <AiOutlineStar className="reviewForm__ratingStar" />
                              <AiOutlineStar className="reviewForm__ratingStar" />
                              <AiOutlineStar className="reviewForm__ratingStar" />
                              <AiOutlineStar className="reviewForm__ratingStar" />
                            </div>
                            <InputRating title="کیفیت ساخت" />
                            <InputRating title="ارزش خرید به نسبت قیمت" />
                            <InputRating title="نوآوری" />
                            <InputRating title="امکانات و قابلیت ها " />
                            <InputRating title="سهولت استفاده" />
                          </div>
                          <div className="row point__wrapper">
                            <div className="col-12 col-sm-6 addPoint__wrapper advantages ">
                              <label
                                htmlFor="addPoint__input"
                                className="addPoint__title"
                              >
                                نقاط قوت
                              </label>
                              <div className="add__wrapper">
                                <input
                                  type="text"
                                  id="addPoint__input"
                                  className="addPoint__input"
                                  value={currentAdvantages}
                                  onChange={(e) =>
                                    setCurrentAdvantages(e.target.value)
                                  }
                                  onInput={(e) =>
                                    setCurrentAdvantages(e.target.value)
                                  }
                                  onKeyUp={(e) => {
                                    e.target.value.trim().length !== 0
                                      ? setIsShowAddBtnAdvantages(true)
                                      : setIsShowAddBtnAdvantages(false);
                                    if (e.key === "Enter") {
                                      addAdvantages();
                                    }
                                  }}
                                />
                                <AiOutlinePlusCircle
                                  onClick={addAdvantages}
                                  className={`points__addBtn ${
                                    isShowAddBtnAdvantages
                                      ? "points__addBtn--show"
                                      : ""
                                  } `}
                                />
                              </div>
                              {advantagesError && (
                                <span className="errorAddPoint">
                                  لطفا از کلمات با معنی و حداقل طول چهار استفاده
                                  کنید
                                </span>
                              )}

                              <div className="points__wrapper">
                                <ul className="points__lists">
                                  {advantagesLists.map((advantage) => (
                                    <li
                                      className="points__item advantages__item"
                                      key={advantage.id}
                                    >
                                      {advantage.title}
                                      <IoMdClose
                                        className="points__icon advantages__icon"
                                        onClick={() =>
                                          removeAdvantages(advantage.id)
                                        }
                                      />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 addPoint__wrapper disadvantages">
                              <label
                                htmlFor="disadvantages"
                                className="addPoint__title"
                              >
                                نقاط ضعف
                              </label>
                              <div className="add__wrapper">
                                <input
                                  type="text"
                                  id="disadvantages"
                                  className="addPoint__input"
                                  value={currentDisadvantages}
                                  onChange={(e) =>
                                    setCurrentDisadvantages(e.target.value)
                                  }
                                  onInput={(e) =>
                                    setCurrentDisadvantages(e.target.value)
                                  }
                                  onKeyUp={(e) => {
                                    e.target.value.trim().length !== 0
                                      ? setIsShowAddBtnDisadvantages(true)
                                      : setIsShowAddBtnDisadvantages(false);
                                    if (e.key === "Enter") {
                                      addDisadvantages();
                                    }
                                  }}
                                />
                                <AiOutlinePlusCircle
                                  onClick={addDisadvantages}
                                  className={`points__addBtn ${
                                    isShowAddBtnDisadvantages
                                      ? "points__addBtn--show"
                                      : ""
                                  } `}
                                />
                              </div>
                              {disadvantagesError && (
                                <span className="errorAddPoint">
                                  لطفا از کلمات با معنی و حداقل طول چهار استفاده
                                  کنید
                                </span>
                              )}

                              <div className="points__wrapper">
                                <ul className="points__lists">
                                  {disadvantagesLists.map((disadvantage) => (
                                    <li
                                      className="points__item disadvantages__item"
                                      key={disadvantage.id}
                                    >
                                      {disadvantage.title}
                                      <IoMdClose
                                        className="points__icon disadvantages__icon"
                                        onClick={() =>
                                          removeDisadvantages(disadvantage.id)
                                        }
                                      />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="reviewForm__commentWrapper">
                              <label
                                className="reviewForm__commentTitle"
                                htmlFor="comment"
                              >
                                دیدگاه شما *
                              </label>
                              <textarea
                                className="reviewForm__commentTextArea"
                                id="comment"
                              ></textarea>
                            </div>
                            <div className="reviewForm__submitWrapper">
                              <input
                                type="submit"
                                value="ثبت"
                                className="reviewForm__submit"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="allComments__wrapper">
                    <div className="allComments__header">
                      <h2 className="allComments__title">
                        نقد ها و بررسی ها
                        <span>2</span>
                      </h2>
                      <ul className="allComments__sorted">
                        <BsSortDown className="allComments__sorteIcon" />
                        <li className="allComments__sorteItem allComments__sorteItem--active">
                          جدیدترین
                        </li>
                        <li className="allComments__sorteItem">مفیدترین</li>
                        <li className="allComments__sorteItem">
                          دیدگاه خریداران
                        </li>
                      </ul>
                    </div>
                    <ul className="userComment__wrapper">
                      <li className="userComment__item">
                        <div className="comment__content">
                          <div className="comment__meta">
                            <div className="comment__metaRating">
                              <AiOutlineStar className="comment__metaIcon" />
                              4.8
                            </div>
                            <span className="comment__metaAuthor">
                              محمد گراوند
                            </span>
                            <time
                              className="comment__time"
                              datetime="1397-12-22T15:36:15"
                            >
                              ۲۲ اسفند ۱۳۹۷
                            </time>
                          </div>
                          <div className="comment__isRecommended">
                            <span className="comment--recommended">
                              <FaRegThumbsUp className="comment__iconIsRecommended" />
                              خرید این محصول را توصیه می‌کنم
                            </span>
                            <span className="comment--notRecommended">
                              <FaRegThumbsDown className="comment__iconIsRecommended" />
                              خرید این محصول را توصیه نمی‌کنم
                            </span>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="comment__pointWrapper">
                                <span className="comment__pointTitle titleAd">
                                  نقاط قوت
                                </span>
                                <ul className="comment__pointLists  advantagesList">
                                  <li className="comment__pointListItem">
                                    صفحه نمایش با کیفیت
                                  </li>
                                  <li className="comment__pointListItem">
                                    ظاهر زیبا و شکیل
                                  </li>
                                  <li className="comment__pointListItem">
                                    مقاوم در برابر آب
                                  </li>
                                  <li className="comment__pointListItem">
                                    دوربین با کیفیت
                                  </li>
                                  <li className="comment__pointListItem">
                                    Face Id
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="comment__pointWrapper">
                                <span className="comment__pointTitle titleDisAd">
                                  نقاط ضعف
                                </span>
                                <ul className="comment__pointLists disadvantages">
                                  <li className="comment__pointListItem">
                                    باگ داشتنIOS11 و نبود آداپتور شارژ سریع
                                  </li>
                                  <li className="comment__pointListItem">
                                    مشکل قرار گیری روی سطح صاف
                                  </li>
                                  <li className="comment__pointListItem">
                                    عدم سازگاری برخی برنامه ها
                                  </li>
                                  <li className="comment__pointListItem">
                                    حذف جک3.5 و اثر انگشت
                                  </li>
                                  <li className="comment__pointListItem">
                                    قیمت بالا و عدم نشان دادن درصد شارژ
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="comment__description">
                            <p className="comment__descriptionText">
                              گوشی عالی ایه ظاهر جلوش که فوق العادس فقط پشتش رو
                              شاید یکسری از دوستان نپسندند. سخت افزار خیلی قوی
                              ای داره و نرم افزار های سنگین خیلی روان اجرا میشه
                              اگه با قیمتش مشکلی ندارین خیلی گوشی خوبیه و از
                              سامسونگ خیلی بهتره(البته برای کسایی که قبلا از اپل
                              استفاده کرده باشن)
                            </p>
                          </div>
                          <div className="comment__isLikeWrapper">
                            <span className="comment__isLikeTitle">
                              آیا این نظر برایتان مفید بود؟
                            </span>
                            <div className="comment__isLikeBtnWrapper">
                              <span className="comment__isLikeBtn ">
                                <span className="likedCount">71</span>
                                بله
                              </span>
                              <span className="comment__isLikeBtn ">
                                <span className="likedCount">14</span>
                                خیر
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="userComment__item">
                        <div className="comment__content">
                          <div className="comment__meta">
                            <div className="comment__metaRating">
                              <AiOutlineStar className="comment__metaIcon" />
                              4.8
                            </div>
                            <span className="comment__metaAuthor">
                              محمد گراوند
                            </span>
                            <time
                              className="comment__time"
                              datetime="1397-12-22T15:36:15"
                            >
                              ۲۲ اسفند ۱۳۹۷
                            </time>
                          </div>
                          <div className="comment__isRecommended">
                            <span className="comment--recommended">
                              <FaRegThumbsUp className="comment__iconIsRecommended" />
                              خرید این محصول را توصیه می‌کنم
                            </span>
                            <span className="comment--notRecommended">
                              <FaRegThumbsDown className="comment__iconIsRecommended" />
                              خرید این محصول را توصیه نمی‌کنم
                            </span>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="comment__pointWrapper">
                                <span className="comment__pointTitle titleAd">
                                  نقاط قوت
                                </span>
                                <ul className="comment__pointLists  advantagesList">
                                  <li className="comment__pointListItem">
                                    صفحه نمایش با کیفیت
                                  </li>
                                  <li className="comment__pointListItem">
                                    ظاهر زیبا و شکیل
                                  </li>
                                  <li className="comment__pointListItem">
                                    مقاوم در برابر آب
                                  </li>
                                  <li className="comment__pointListItem">
                                    دوربین با کیفیت
                                  </li>
                                  <li className="comment__pointListItem">
                                    Face Id
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="comment__pointWrapper">
                                <span className="comment__pointTitle titleDisAd">
                                  نقاط ضعف
                                </span>
                                <ul className="comment__pointLists disadvantages">
                                  <li className="comment__pointListItem">
                                    باگ داشتنIOS11 و نبود آداپتور شارژ سریع
                                  </li>
                                  <li className="comment__pointListItem">
                                    مشکل قرار گیری روی سطح صاف
                                  </li>
                                  <li className="comment__pointListItem">
                                    عدم سازگاری برخی برنامه ها
                                  </li>
                                  <li className="comment__pointListItem">
                                    حذف جک3.5 و اثر انگشت
                                  </li>
                                  <li className="comment__pointListItem">
                                    قیمت بالا و عدم نشان دادن درصد شارژ
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="comment__description">
                            <p className="comment__descriptionText">
                              گوشی عالی ایه ظاهر جلوش که فوق العادس فقط پشتش رو
                              شاید یکسری از دوستان نپسندند. سخت افزار خیلی قوی
                              ای داره و نرم افزار های سنگین خیلی روان اجرا میشه
                              اگه با قیمتش مشکلی ندارین خیلی گوشی خوبیه و از
                              سامسونگ خیلی بهتره(البته برای کسایی که قبلا از اپل
                              استفاده کرده باشن)
                            </p>
                          </div>
                          <div className="comment__isLikeWrapper">
                            <span className="comment__isLikeTitle">
                              آیا این نظر برایتان مفید بود؟
                            </span>
                            <div className="comment__isLikeBtnWrapper">
                              <span className="comment__isLikeBtn ">
                                <span className="likedCount">71</span>
                                بله
                              </span>
                              <span className="comment__isLikeBtn ">
                                <span className="likedCount">14</span>
                                خیر
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/*end userComments */}
            {/* start question users */}
            <div
              className={`allDetails ${
                active === "userQuestions" ? "allDetails--show" : ""
              }`}
            >
              <div className="allDetails__headingWrapper">
                <BsQuestionSquare className="allDetails__headingIcon" />
                <div className="allDetails__headingLeft">
                  <span className="allDetails__headingTitle">پرسش و پاسخ</span>
                  <span className="allDetails__headingDesc">
                    Xiaomi POCO X3 Pro M2102J20SG Dual SIM 256GB And 8GB RAM
                    Mobile Phone
                  </span>
                </div>
              </div>
              <ul className="question__lists">
                <li className="qustion__item">
                  <div className="question__header">
                    <span>مهرداد</span>
                    <span>۱۵ آبان ۱۳۹۹</span>
                  </div>
                  <div className="question__body">
                    <p className="question__text">
                      باسلام من X دارم میخوام بدونم با یکبار شارژ چند ساعت کار
                      میکنه؟
                    </p>
                    <button className="qusetion__answerBtn">
                      پاسخ به این سوال
                    </button>
                  </div>

                  <ul className="question__answerLists">
                    <p className="question__answerTitle">پاسخ : </p>
                    <li className="question__answerItem">
                      <div className="question__answer__header">
                        <span>علیرضا</span>
                        <span>16 آبان 1399</span>
                      </div>
                      حدود دو ساعت
                    </li>
                    <li className="question__answerItem">
                      <div className="question__answer__header">
                        <span>حمید</span>
                        <span>25 آبان 1399</span>
                      </div>
                      اگه نت گردی بکنی تا پنج شیش ساعت خوبه{" "}
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="sendQuestion__wrapper">
                <div className="sendQuestion__header">
                  <span className="sendQuestion__title">ارسال پرسش</span>
                </div>
                <div className="sendQuestion__body">
                  <form className="sendQuestion__form">
                    <textarea
                      className="sendQuestion__textArea"
                      placeholder="پرسش خود را بنوسید"
                    ></textarea>
                    <input
                      type="submit"
                      value="ارسال پرسش"
                      className="sendQuestion__submitBtn"
                    />
                  </form>
                </div>
              </div>
            </div>
            {/* end question users */}
            {/* start review */}
            <div
              className={`allDetails ${
                active === "review" ? "allDetails--show" : ""
              }`}
            >
              <div className="allDetails__headingWrapper">
                <TbChecklist className="allDetails__headingIcon" />
                <div className="allDetails__headingLeft">
                  <span className="allDetails__headingTitle">نقد و بررسی</span>
                  <span className="allDetails__headingDesc">
                    Xiaomi POCO X3 Pro M2102J20SG Dual SIM 256GB And 8GB RAM
                    Mobile Phone
                  </span>
                </div>
              </div>
              <div className="reviews__wrapper">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="pointGood__wrapper">
                      <span className="point__title">نقاط قوت</span>
                      <ul>
                        <li>
                          <TbTriangle className="pointGood__icon" />
                          کيفيت ساخت
                        </li>
                        <li>
                          <TbTriangle className="pointGood__icon" />
                          دوربين
                        </li>
                        <li>
                          <TbTriangle className="pointGood__icon" />
                          برند بودن
                        </li>
                        <li>
                          <TbTriangle className="pointGood__icon" />
                          چيپ ست
                        </li>
                        <li>
                          <TbTriangle className="pointGood__icon" />
                          طراحي منحصر بفرد
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="pointBad__wrapper">
                      <span className="point__title">نقاط ضعف</span>
                      <ul>
                        <li>
                          <TbTriangleInverted className="pointBad__icon" />
                          قيمت زياد
                        </li>
                        <li>
                          <TbTriangleInverted className="pointBad__icon" />
                          صفحه نمايش ضعيف IPS
                        </li>
                        <li>
                          <TbTriangleInverted className="pointBad__icon" />
                          قيمت وحشتناک بالا
                        </li>
                        <li>
                          <TbTriangleInverted className="pointBad__icon" />
                          اندروييد پايين
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="reviewprogress__wrapper">
                      <div className="reviewprogress__item">
                        <div className="reviewprogress__header">
                          <span>کیفیت ساخت</span>
                          <span>5.3</span>
                        </div>
                        <div className="reviewprogress__progress">
                          <span className="reviewprogress__progressBar"></span>
                        </div>
                      </div>
                      <div className="reviewprogress__item">
                        <div className="reviewprogress__header">
                          <span>ارزش خرید به نسبت قیمت</span>
                          <span>5.3</span>
                        </div>
                        <div className="reviewprogress__progress">
                          <span className="reviewprogress__progressBar"></span>
                        </div>
                      </div>
                      <div className="reviewprogress__item">
                        <div className="reviewprogress__header">
                          <span>نوآوری</span>
                          <span>5.3</span>
                        </div>
                        <div className="reviewprogress__progress">
                          <span className="reviewprogress__progressBar"></span>
                        </div>
                      </div>
                      <div className="reviewprogress__item">
                        <div className="reviewprogress__header">
                          <span>امکانات و قابلیت ها</span>
                          <span>5.3</span>
                        </div>
                        <div className="reviewprogress__progress">
                          <span className="reviewprogress__progressBar"></span>
                        </div>
                      </div>
                      <div className="reviewprogress__item">
                        <div className="reviewprogress__header">
                          <span>سهولت استفاده</span>
                          <span>5.3</span>
                        </div>
                        <div className="reviewprogress__progress">
                          <span className="reviewprogress__progressBar"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end review */}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <SectionHeader
              title="محصولات مرتبط"
              icon={<AiOutlineRetweet className="fullIcon" />}
              link="/"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {/* <Swiper
              dir="rtl"
              slidesPerView={5}
              spaceBetween={15}
              style={{ overflow: "hidden" }}
              loop={true}
              navigation={true}
              breakpoints={{
                
                270: {
                  slidesPerView: 1,
                },
                600: {
                  slidesPerView: 2,
                },
               
                768: {
                  slidesPerView: 3,
                },
                992: {
                  slidesPerView: 4,
                },
                1200: {
                  slidesPerView: 5,
                },
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {!productsContext.errorProducts ? (
                <>
                  {!productsContext.isLoadingProducts ? (
                    <>
                      {productsContext.products
                        .filter((product) => product.attributes.isNew)
                        .map((product) => (
                          <>
                            <SwiperSlide key={product.id}>
                              <ProductCart details={product.attributes} />
                            </SwiperSlide>
                          </>
                        ))}
                    </>
                  ) : (
                    <span>Loading ...</span>
                  )}
                </>
              ) : (
                <>
                  {console.log("errorProducts", productsContext.errorProducts)}
                </>
              )}
            </Swiper> */}
          </div>
        </div>
      </div>
    </div>
  );
}
