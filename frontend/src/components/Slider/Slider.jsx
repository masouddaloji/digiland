import React, { useEffect, useState } from "react";
//packages
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Thumbs, Zoom } from "swiper";
//components
import SuggestedProductBox from "../SuggestedProductBox/SuggestedProductBox";
import CompanyProduct from "../CompanyProduct/CompanyProduct";
import ArticleBox from "../ArticleBox/ArticleBox";
import ProductCart from "../ProductCart/ProductCart";
import BannerBox from "../BannerBox/BannerBox";
//icons
import { TfiSearch } from "react-icons/tfi";

// styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Slider.css";

function Slider(props) {
  const {
    slidesPerView,
    spaceBetween,
    loop,
    centeredSlides,
    autoplay,
    navigation,
    slide,
    array,
  } = props;

  switch (slide) {
    case "ProductCart":
      return (
        <Swiper
          dir="rtl"
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          centeredSlides={centeredSlides?true:false}
          autoplay={{ delay: autoplay, disableOnInteraction: false }}
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
              slidesPerView: slidesPerView,
            },
          }}
          modules={[Autoplay, Navigation]}
          className="customSwiper"
        >
          {array?.map((item) => (
            <SwiperSlide key={item._id}>
              <ProductCart {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    case "ArticleBox":
      return (
        <Swiper
          dir="rtl"
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween }
          centeredSlides={centeredSlides?true:false}
          autoplay={{ delay: autoplay, disableOnInteraction: false }}
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
              slidesPerView: slidesPerView,
            },
          }}
          modules={[Autoplay, Navigation]}
          className="customSwiper"
        >
          {array?.map((item) => (
            <SwiperSlide key={item._id}>
              <ArticleBox {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    case "CompanyProduct":
      return (
        <Swiper
          dir="rtl"
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          centeredSlides={centeredSlides?true:false}
          autoplay={{ delay: autoplay, disableOnInteraction: false }}
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
              slidesPerView: slidesPerView,
            },
          }}
          modules={[Autoplay, Navigation]}
          className="customSwiper"
        >
          {array?.map((item) => (
            <SwiperSlide key={item._id}>
              <CompanyProduct {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    case "SuggestedProductBox":
      return (
        <Swiper
          dir="rtl"
          slidesPerView={slidesPerView }
          spaceBetween={spaceBetween}
          autoplay={{ delay: autoplay, disableOnInteraction: false }}
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
              slidesPerView: slidesPerView,
            },
          }}
          modules={[Autoplay, Navigation]}
          className="customSwiper"
        >
          {array?.map((item) => (
            <SwiperSlide key={item._id}>
              <SuggestedProductBox {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    case "BannerBox":
      return (
        <Swiper
          dir="rtl" 
          spaceBetween={spaceBetween}
          centeredSlides={true}
          autoplay={{ delay: autoplay, disableOnInteraction: false }}
          loop={true}
          navigation={true}
          // pagination={{clickable:true}}
          modules={[Autoplay, Pagination, Navigation]}
          className="customSwiper"
        >
          {array?.map((item) => (
            <SwiperSlide key={item._id}>
              <BannerBox {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    case "image":
      return (
        <Swiper
          dir="rtl"
          slidesPerView={slidesPerView }
          spaceBetween={spaceBetween }
          centeredSlides={centeredSlides?true:false}
          autoplay={{ delay: autoplay, disableOnInteraction: false }}
          loop={loop ? true : false}
          navigation={navigation ? true : false}
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
              slidesPerView: slidesPerView,
            },
          }}
          modules={[Autoplay, Navigation]}
          className="customSwiper"
        >
          {array?.map((item) => (
            <SwiperSlide key={item._id}>
              <img
                src={item}
                alt="gallery product"
                className="image__gallery"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      );
          
    default: {
      return null;
    }
  }
}

export default Slider;
