import { useState } from "react";
//packages
import { Swiper, SwiperSlide } from "swiper/react";

//components
import SwiperCore, { Autoplay, Navigation, Thumbs } from "swiper";
//styles
import "./ProductGallery.css";

SwiperCore.use([Thumbs]);


const ProductGallery = ({ array }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeThumbIndex, setActiveThumbIndex] = useState(null);

  return (
    <div className="productGallery">
      <Swiper
        dir="rtl"
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={({ activeIndex }) => {
          setActiveIndex(activeIndex);
        }}
        loop={true}
        spaceBetween={20}
        modules={[Thumbs]}
        style={{ width: "100%" }}
        zoom={true}
        className="largSwiper"
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
          slidesPerView={Math.min(5, array?.length)}
          spaceBetween={10}
          loop={true}
          modules={[Navigation, Thumbs]}
          className="smallSwiper"
        >
          {array?.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={`http://localhost:8000${item}`}
                alt="product image"
                className="product__smallImage"
                onClick={() => setActiveThumbIndex(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;
