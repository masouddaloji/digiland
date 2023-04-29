import React, { useCallback, useState } from "react";
//packages
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

//components
import SwiperCore, { Autoplay, Navigation, Thumbs } from "swiper";
//styles
import "./ProductGallery.css";

SwiperCore.use([Thumbs]);
const ProductGallery = ({ array }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeThumbIndex, setActiveThumbIndex] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [isShowMagnifier, setIsShowMagnifier] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: null, height: null });
  const [zoomLevel, setZoomLevel] = useState(2.5);

  const mouseEnterHandler = (e) => {
    setCurrentImage(e.currentTarget?.src ?? null);
    const image = e.currentTarget;
    const { width, height } = image.getBoundingClientRect();
    setSize({ width, height });
    setIsShowMagnifier(true);
  };

  const mouseMoveHandler = (e) => {
    const image = e.currentTarget;
    const { top, left } = image.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setMousePosition({ x, y });
  };

  const mouseLeaveHandler = () => {
    setIsShowMagnifier(false);
  };

  return (
    <div className="productGallery">
      <Swiper
        dir="rtl"
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={({ activeIndex }) => {
          setActiveIndex(activeIndex);
          setIsShowMagnifier(false);
        }}
        spaceBetween={10}
        modules={[Thumbs]}
        grabCursor={true}
        style={{ width: "100%" }}
        zoom={false}
        className="largSwiper"
      >
        {array?.map((item, index) => (
          <SwiperSlide key={uuidv4()}>
            <div className="largeImage__box">
              <img
                src={`http://localhost:8000${item}`}
                alt="product image"
                className="product__largeImage"
                onMouseMove={mouseMoveHandler}
                onMouseLeave={mouseLeaveHandler}
                onMouseEnter={mouseEnterHandler}
              />
             {isShowMagnifier? <div
                className="magnifier"
                style={{
                  top: `${mousePosition.y - 50}px`,
                  left: `${mousePosition.x - 50}px`,
                  backgroundImage: `url(${currentImage})`,
                  backgroundSize: `${size.width * zoomLevel}px ${
                    size.height * zoomLevel
                  }px`,
                  backgroundPositionX: `${-mousePosition.x * zoomLevel + 50}px`,
                  backgroundPositionY: `${-mousePosition.y * zoomLevel + 50}px`,
                }}
              ></div>:null}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="product__smallImagesWrapper">
        <Swiper
          onSwiper={setThumbsSwiper}
          dir="rtl"
          slidesPerView={5}
          spaceBetween={15}
          modules={[Navigation, Thumbs]}
          className="smallSwiper"
        >
          {array?.map((item, index) => (
            <SwiperSlide key={uuidv4()}>
              <div className={`smallImage__box ${index === activeThumbIndex ? 'active' : ''}`}>
                <img
                  src={`http://localhost:8000${item}`}
                  alt="product image"
                  className="product__smallImage"
                  onClick={() => setActiveThumbIndex(index)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;
