import { useState } from "react";
//packages
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Thumbs, Zoom } from "swiper";

//  Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
//styles
import "./ProductGallery.css";

const ProductGallery = ({ array = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperModules = [Zoom, Navigation, Thumbs, Autoplay];

  return (
    <div className="productGallery">
      <Swiper
        spaceBetween={15}
        navigation={true}
        dir="rtl"
        zoom={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={swiperModules}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="largSwiper"
        style={{ width: "100%" }}
      >
        {array?.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={`http://localhost:8000${item}`}
              alt="product image"
              className="product__largeImage"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="product__smallImagesWrapper">
        <Swiper
          onSwiper={setThumbsSwiper}
          dir="rtl"
          spaceBetween={15}
          slidesPerView={Math.min(5, array?.length)}
          watchSlidesProgress={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="smallSwiper"
          style={{ width: "100%" }}
          modules={[Autoplay]}
        >
          {array?.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={`http://localhost:8000${item}`}
                alt="product image"
                className="product__smallImage"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;
