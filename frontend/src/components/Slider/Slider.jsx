//packages
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { nanoid } from "@reduxjs/toolkit";
//swiper styles
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

// styles
import "./Slider.css";

function Slider({
  array,
  slide,
  isLoading,
  isSuccess,
  slidesPerView = 1,
  ...restprops
}) {
  const selectslide = (item) => {
    switch (slide) {
      case "SuggestedProductBox":
        return (
          <SuggestedProductBox
            {...item}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        );
      case "CompanyProduct":
        return (
          <CompanyProduct
            {...item}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        );
      case "ArticleBox":
        return (
          <ArticleBox {...item} isLoading={isLoading} isSuccess={isSuccess} />
        );
      case "ProductCart":
        return (
          <ProductCart {...item} isLoading={isLoading} isSuccess={isSuccess} />
        );
      case "BannerBox":
        return (
          <BannerBox {...item} isLoading={isLoading} isSuccess={isSuccess} />
        );
      case "serviceBox":
        return (
          <ServiceBox {...item} isLoading={isLoading} isSuccess={isSuccess} />
        );
      case "instantOffer":
        return (
          <InstantOffer {...item} isLoading={isLoading} isSuccess={isSuccess} />
        );
      case "footerSlider":
        return (
          <FooterSlider {...item} isLoading={isLoading} isSuccess={isSuccess} />
        );
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
        slidesPerView > 1
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
                    : slidesPerView - 1,
              },
              1100: {
                slidesPerView: slidesPerView,
              },
              1200: {
                slidesPerView: slidesPerView,
              },
            }
          : null
      }
      className="customSwiper"
    >
      {/* */}
      {isSuccess
        ? array?.map((item) => (
            <SwiperSlide key={nanoid()}>{selectslide(item)}</SwiperSlide>
          ))
        :isLoading
        ? Array(slidesPerView ?? 1)
            .fill(0)
            .map(() => (
              <SwiperSlide key={nanoid()}>{selectslide()}</SwiperSlide>
            ))
        : null}
    </Swiper>
  );
}

export default Slider;
