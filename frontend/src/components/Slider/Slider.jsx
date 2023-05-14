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
import ServiceBox from "../../components/ServiceBox/ServiceBox";
import InstantOffer from "../InstantOffer/InstantOffer";
import FooterSlider from "../FooterSlider/FooterSlider";
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
      case "serviceBox":
        return <ServiceBox {...item} {...restprops} />;
      case "instantOffer":
        return <InstantOffer {...item} {...restprops} />;
      case "footerSlider":
        return <FooterSlider {...item} {...restprops} />;
      default:
        return null;
    }
  };
  return (
    <Swiper
      {...restprops}
      dir="rtl"
      pagination={slide === "instantOffer" ? { clickable: true } : false}
      autoplay={
        restprops.autoplay
          ? {
              delay: 3000,
              disableOnInteraction: false,
            }
          : false
      }
      breakpoints={
        restprops.slidesPerView > 1
          ? {
              300: {
                slidesPerView:
                  slide === "serviceBox" || slide === "footerSlider" ? 2 : 1,
              },
              480: {
                slidesPerView:
                  slide === "SuggestedProductBox"
                    ? 1
                    : slide === "serviceBox" || slide === "footerSlider"
                    ? 3
                    : 2,
              },
              576: {
                slidesPerView:
                  slide === "SuggestedProductBox"
                    ? 2
                    : slide === "serviceBox"
                    ? 5
                    : slide === "footerSlider"
                    ? 4
                    : slide === "ArticleBox"
                    ? 2
                    : 3,
              },
              768: {
                slidesPerView:
                  slide === "serviceBox" || slide === "footerSlider"
                    ? 6
                    : slide === "SuggestedProductBox"
                    ? 3
                    : slide === "ArticleBox"
                    ? 3
                    : 4,
              },
              992: {
                slidesPerView:
                  slide === "serviceBox" || slide === "footerSlider"
                    ? 7
                    : restprops.slidesPerView - 1,
              },
              1100: {
                slidesPerView: restprops.slidesPerView,
              },
              1200: {
                slidesPerView: restprops.slidesPerView,
              },
            }
          : null
      }
      className="customSwiper"
    >
      {array?.map((item) => (
        <SwiperSlide key={uuidv4()}>{selectslide(item)}</SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
