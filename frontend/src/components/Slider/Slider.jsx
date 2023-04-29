import React from "react";
//packages
import { v4 as uuidv4 } from "uuid";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
//components
import SuggestedProductBox from "../SuggestedProductBox/SuggestedProductBox";
import CompanyProduct from "../CompanyProduct/CompanyProduct";
import ArticleBox from "../ArticleBox/ArticleBox";
import ProductCart from "../ProductCart/ProductCart";
import BannerBox from "../BannerBox/BannerBox";
//icons
import { TfiSearch } from "react-icons/tfi";
// styles
import "./Slider.css";

SwiperCore.use([Autoplay, Pagination, Navigation]);

function Slider({ array, slide, ...restprops }) {
  const selectslide = (item) => {
    switch (slide) {
      case "SuggestedProductBox":
        return <SuggestedProductBox {...item} {...restprops} />;
      case "CompanyProduct":
        return <CompanyProduct {...item} {...restprops} />;
      case "ArticleBox":
        return <ArticleBox {...item} {...restprops} />;
      case "ProductCart":
        return <ProductCart {...item} {...restprops} />;
      case "BannerBox":
        return <BannerBox {...item} {...restprops} />;
      default:
        return null;
    }
  };
  return (
    <Swiper
     {...restprops}
      dir="rtl"
      autoplay={restprops.autoplay?{
          delay: 3000,
          disableOnInteraction: false,
        }:null}
      className="customSwiper"
    >
      {array?.map((item) => (
        <SwiperSlide key={uuidv4()}>{selectslide(item)}</SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
