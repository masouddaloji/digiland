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
  slidesPerView,
  ...restprops
}) {

  const slideComponents = {
    SuggestedProductBox: SuggestedProductBox,
    CompanyProduct: CompanyProduct,
    ArticleBox: ArticleBox,
    ProductCart: ProductCart,
    BannerBox: BannerBox,
    serviceBox: ServiceBox,
    instantOffer: InstantOffer,
    footerSlider: FooterSlider,
  };

  const selectSlide = (item) => {
    const SlideComponent = slideComponents[slide];
    if (SlideComponent) {
      return (
        <SlideComponent {...item} isLoading={isLoading} isSuccess={isSuccess} />
      );
    }
    return null;
  };

  return (
    <Swiper
      {...restprops}
      dir="rtl"
      pagination={slide === "instantOffer" ? { clickable: true } : false}
      autoplay={
        restprops.autoplay && {
          delay: 3000,
          disableOnInteraction: false,
        }
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
                  slide === "SuggestedProductBox" ||
                  slide === "ArticleBox" ||
                  slide === "ProductCart"
                    ? 2
                    : slide === "serviceBox"
                    ? 5
                    : slide === "footerSlider"
                    ? 4
                    : 3,
              },
              768: {
                slidesPerView:
                  slide === "serviceBox" || slide === "footerSlider"
                    ? 6
                    : slide === "SuggestedProductBox" ||
                      slide === "ProductCart" ||
                      slide === "ArticleBox"
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
      modules={[Autoplay, Pagination, Navigation]}
      className="customSwiper"
    >
      {/* */}

      {isSuccess &&
        array?.map((item, index) => (
          <SwiperSlide key={item.id ?? index}>{selectSlide(item)}</SwiperSlide>
        ))}

      {isLoading &&
        Array(slidesPerView ?? 1)
          .fill(0)
          .map(() => <SwiperSlide key={nanoid()}>{selectSlide()}</SwiperSlide>)}
    </Swiper>
  );
}

export default Slider;
