import React, { useState } from "react";
//packages
import { Swiper, SwiperSlide } from "swiper/react";
//components
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  Thumbs,
  Zoom,
} from "swiper";
SwiperCore.use([Thumbs]);
const ProductGallery = (props) => {
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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [isShowMagnifier, setIsShowMagnifier] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: null, height: null });
  const [zoomLevel, setZoomLevel] = useState(2.5);

  const mouseEnterHandler = (e) => {
    setCurrentImage(e.currentTarget?.src);
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
    <section className="product__gallery">
      <div className="product__largeImageBox">
        {isShowMagnifier && (
          <div
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
          ></div>
        )}
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
          zoom={false}
          className="mySwiper"
        >
          {array?.map((item, index) => (
            <SwiperSlide key={index + 1}>
              <img
                src={`http://localhost:8000${item}`}
                alt="product image"
                className="product__smallImage"
                onMouseMove={mouseMoveHandler}
                onMouseLeave={mouseLeaveHandler}
                onMouseEnter={mouseEnterHandler}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="product__smallImagesWrapper">
        <Swiper
          onSwiper={setThumbsSwiper}
          dir="rtl"
          slidesPerView={5}
          spaceBetween={10}
          modules={[Navigation, Thumbs]}
          className="mySwiper swiperThumbs"
        >
          {array?.map((item, index) => (
            <SwiperSlide key={index + 1} onClick={() => setActiveIndex(index)}>
              <img
                src={`http://localhost:8000${item}`}
                alt="product image"
                className="product__smallImage"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductGallery;