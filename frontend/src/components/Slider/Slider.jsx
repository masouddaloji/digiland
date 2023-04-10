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
    sliders,
    spaceBetween,
    loop,
    centeredSlides,
    autoplay,
    navigation,
    slide,
    array,
  } = props;
  const [activeThumbs, setActiveThumbs] = useState();
  const [activeImageIndex,setAactiveImageIndex]=useState()
  const [magnifyStyle, setMagnifyStyle] = useState({});
  const mouseMoveHandler = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;
    const xPercent = (offsetX / offsetWidth) * 100;
    const yPercent = (offsetY / offsetHeight) * 100;
    setMagnifyStyle((prev) => ({
      ...prev,
      backgroundImage:array?.[activeImageIndex]&&`http://localhost:8000${array[0]}`,
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
  setMagnifyStyle(prev=>({...prev,backgroundImage:`http://localhost:8000${array[activeImageIndex]}`}))
},[activeImageIndex])
  switch (slide) {
    case "ProductCart":
      return (
        <Swiper
          dir="rtl"
          slidesPerView={sliders}
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
              slidesPerView: sliders,
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
          slidesPerView={sliders}
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
              slidesPerView: sliders,
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
          slidesPerView={sliders}
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
              slidesPerView: sliders,
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
          slidesPerView={sliders }
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
              slidesPerView: sliders,
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
          slidesPerView={sliders }
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
              slidesPerView: sliders,
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
    case "thumb":
            return (
              <>
                  <div className="product__largeImageBox">
                  <Swiper
                    dir="rtl"
                    loop={true}
                    spaceBetween={10}
                    modules={[ Thumbs, Zoom]}
                    grabCursor={true}
                    zoom={{ maxRatio: 5, minRatio: 1 }}
                    thumbs={{ swiper: activeThumbs }}
                    className="mySwiper"
                  >
                  {array?.map((item,index)=> <SwiperSlide key={index+1}>
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
                    onSwiper={(swiper)=>{
                      setActiveThumbs(swiper)
                      setAactiveImageIndex(swiper?.realIndex)
                      console.log("swiper",swiper)}}
                    dir="rtl"
                    loop={true}
                    slidesPerView={4}
                    spaceBetween={10}
                    modules={[Navigation, Thumbs]}
                    className="mySwiper swiperThumbs"
                  >
                   {array?.map((item,index)=> <SwiperSlide key={index+1}>
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
              </>
            )
          
    default: {
      return null;
    }
  }
}

export default Slider;
