import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Index.css";

import { Link } from "react-router-dom";
import { MdOutlineDevices } from "react-icons/md";
import { BsPrinter, BsTools } from "react-icons/bs";
import { TbDeviceTvOld } from "react-icons/tb";
import { RiHeartPulseLine } from "react-icons/ri";
import { IoMdFootball, IoIosHourglass } from "react-icons/io";
import { BiLayerPlus } from "react-icons/bi";
import { AiFillApple } from "react-icons/ai";
import { GrRss } from "react-icons/gr";
import SuggestedProductBox from "../../components/SuggestedProductBox/SuggestedProductBox";
import ProductCart from "../../components/ProductCart/ProductCart";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import CompanyProduct from "../../components/CompanyProduct/CompanyProduct";
import ArticleBox from "../../components/ArticleBox/ArticleBox";
import ProductsContext from "../../Context/ProductsContext";
import token from "../../utils/api";
import ServiceBox from "../../components/ServiceBox/ServiceBox";
import Slider from "../../components/Slider/Slider";

export default function Index() {
  const banners=[
    {id:101,link:"/",cover:"/images/widget/widget-img-1.png"},
    {id:202,link:"/",cover:"/images/widget/widget-img-2.png"},
    {id:303,link:"/",cover:"/images/widget/widget-img-3.png"},
    {id:404,link:"/",cover:"/images/widget/widget-img-4.png"},
]
const articles=Array(6).fill(0)
console.log("articles",articles)
  const [services, setServices] = useState([]);
  const getServices = async () => {
    await fetch("http://localhost:1337/api/services?populate=deep", {
      headers: { Authorization: `bearer ${token}` },
    })
      .then((res) => res.json())
      .then((allServices) => setServices(allServices.data));
  };
  useEffect(() => {
    getServices();
  }, []);

  const suggestionProduct = [
    {
      id: 1,
      title: "گوشی موبايل سامسونگ مدل Galaxy S8 Plus SM-G955FD دو سيم کارت",
      cover: "./images/sug/sug6.jpg",
      productPrice: 15000000,
      currentPrice: 13800000,
      link: "/",
      offerTime: { day: 5, hour: 14 },
      percent: 8,
    },
    {
      id: 2,
      title:
        "گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت 128 گیگابایت",
      cover: "./images/sug/sug4.jpg",
      productPrice: 17200000,
      currentPrice: 16400000,
      link: "/",
      offerTime: { day: 3, hour: 1 },
      percent: 5,
    },
    {
      id: 3,
      title:
        "گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت 128 گیگابایت",
      cover: "./images/sug/sug5.webp",
      productPrice: 21000000,
      currentPrice: 19900000,
      link: "/",
      offerTime: { day: 1, hour: 14 },
      percent: 5,
    },
    {
      id: 4,
      title: "لپ تاپ 17 اينچي الين وير مدل 17 AW17R3",
      cover: "./images/sug/sug1.jpg",
      productPrice: 36000000,
      currentPrice: 35100000,
      link: "/",
      offerTime: { day: 3, hour: 21 },
      percent: 2.5,
    },
    {
      id: 5,
      title: "تلويزيون ال اي دي هوشمند خميده سامسونگ مدل 88KS9800 سايز 88 اينچ",
      cover: "./images/sug/sug2.jpg",
      productPrice: 15000000,
      currentPrice: 1400000,
      link: "/",
      offerTime: { day: 1, hour: 1 },
      percent: 7,
    },
    {
      id: 6,
      title: "دوربین ديجيتال نيکون مدل Coolpix P900",
      cover: "./images/sug/sug3.jpg",
      productPrice: 8000000,
      currentPrice: 6700000,
      link: "/",
      offerTime: { day: 1, hour: 4 },
      percent: 7,
    },
  ];
  const productsContext = useContext(ProductsContext);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-9">
            <div className="widget">
            {/* banner */}
            <Slider space={45}  isNavigation={true}  center={true} array={banners} slide="BannerBox"/>
            </div>
          </div>
          <div className="col-lg-3 hideninstantOffer">
            <div className="instantOffer">
              <div className="instantOffer__titleBox">
                <span className="instantOffer__title">پیشنهاد لحظه ای</span>
              </div>
              <div className="instantOffer__imgBox">
                <img
                  src="/images/instantOffer/instantOffer-1.png"
                  alt="instantOffer image"
                  className="instantOffer__img"
                />
              </div>
              <p className="instantOffer__ProductName">
                گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت 128
                گیگابایت
              </p>
              <div className="instantOffer__priceBox">
                <del>
                  <bdi className="productPrice">15,000,000</bdi>
                  <span className="toman">تومان</span>
                </del>
                <bdi className="currentPrice">14,200,000</bdi>
                <span className="toman">تومان</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {services.map((service) => (
            <div className="col-6 col-md-4 col-lg-2" key={service.id}>
              <ServiceBox
                title={service.attributes.title}
                Icon={service.attributes.icon}
                link={service.attributes.link}
              />
            </div>
          ))}
        </div>
        <section className="amazinOffer">
          <div className="row">
            <div className="col-12">
              <div className="amazinOffer__header">
                <div className="amazinOffer__iconBox">
                  <IoIosHourglass className="fullIcon" />
                </div>
                <h3 className="amazinOffer__title">
                  <span className="amazinOffer__goldText">پیشنهادات </span>شـگفت
                  انگیز
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
            <Slider numberSlidePreview={5} space={15} isLoop={true} isNavigation={true} timeAutoplay={2500} array={suggestionProduct} slide="SuggestedProductBox"/>
            </div>
          </div>
        </section>
        {/* banner  */}
        <section className="bannerBoxes">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="bannerBox">
                <Link to="/">
                  <img
                    src="/images/banner-2.webp"
                    alt="banner image"
                    className="bannerBoxImg"
                  />
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="bannerBox">
                <Link to="/">
                  <img
                    src="/images/banner-3.webp"
                    alt="banner image"
                    className="bannerBoxImg"
                  />
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="bannerBox">
                <Link to="/">
                  <img
                    src="/images/banner-1.webp"
                    alt="banner image"
                    className="bannerBoxImg"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="newProduct">
          <div className="row">
            <div className="col-12">
              <SectionHeader
                title="جدیدترین محصولات"
                icon={<BiLayerPlus className="sectionHeader__icon" />}
                link="/"
                btnLink="/"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
            {/* convert to component */}
              {/* <Swiper
                dir="rtl"
                slidesPerView={5}
                spaceBetween={15}
                style={{ overflow: "hidden" }}
                loop={true}
                navigation={true}
                breakpoints={{
                  // when window width is >= 640px
                  270: {
                    slidesPerView: 1,
                  },
                  600: {
                    slidesPerView: 2,
                  },
                  // when window width is >= 768px
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
                        {productsContext.products.filter((product) => product.attributes.isNew)
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
        </section>
        <section className="appleProduct">
          <div className="row">
            <div className="col-12">
              <SectionHeader
                title="محصولات اپل"
                icon={<AiFillApple className="sectionHeader__icon" />}
              />
            </div>
          </div>
          <div className="row">
          {!productsContext.errorProducts ? (
                  <>
                    {!productsContext.isLoadingProducts ? (
                      <>
                        {productsContext.products .filter(
                (product) =>
                  product.attributes.brand.data.attributes.title === "apple"
              )
              .map((product) => (
                <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                  <CompanyProduct details={product.attributes} />
                </div>
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

          </div>
        </section>
        {/* articles */}
        <section className="aricles">
          <div className="row">
            <div className="col-12">
              <SectionHeader
                title="دانش نامـه"
                link="/"
                btnLink="/"
                icon={<GrRss className="sectionHeader__icon" />}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
            <Slider numberSlidePreview={5} space={15} isLoop={true} isNavigation={true} array={articles} slide="ArticleBox"/>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
