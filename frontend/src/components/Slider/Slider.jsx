import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Slider.css";
import SuggestedProductBox from "../SuggestedProductBox/SuggestedProductBox";
import CompanyProduct from "../CompanyProduct/CompanyProduct";
import ArticleBox from "../ArticleBox/ArticleBox";
import ProductCart from "../ProductCart/ProductCart";
import BannerBox from "../BannerBox/BannerBox";

function Slider({numberSlidePreview,space,isLoop,isNavigation,timeAutoplay,center,className, array, slide }) {

  return (
    <Swiper
      dir="rtl"
      slidesPerView={numberSlidePreview && numberSlidePreview}
      spaceBetween={space && space }
      style={{ overflow: "hidden" }}
      loop={isLoop && true }
      navigation={isNavigation && true}
      centeredSlides={center && true}
      autoplay={
        timeAutoplay
          && {
              delay: timeAutoplay,
              disableOnInteraction: false,
            }
      }
      breakpoints={
        numberSlidePreview
          && {
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
            }
      }
      modules={[Autoplay, Pagination, Navigation]}
      className="customSwiper"
    >
      {slide==="ProductCart"?(
        array.map(item=>(
        <SwiperSlide key={item.id}>
        <ProductCart {...item} />
      </SwiperSlide>
    ))
    ):slide==="ArticleBox"?(
        array.map(item=>(
        <SwiperSlide key={item.id}>
        <ArticleBox {...item} />
      </SwiperSlide>
    ))
    ):slide==="CompanyProduct"?(
        array.map(item=>(
        <SwiperSlide key={item.id}>
        <CompanyProduct {...item} />
      </SwiperSlide>
    ))
    ):slide==="SuggestedProductBox"?(
        array.map(item=>(
        <SwiperSlide key={item.id}>
        <SuggestedProductBox {...item} />
      </SwiperSlide>
    ))
    ):slide==="BannerBox"?(
        array.map(item=>(
        <SwiperSlide key={item.id}>
        <BannerBox {...item} />
      </SwiperSlide>
    ))
    ):null}

    </Swiper>
  );
}

export default Slider;
