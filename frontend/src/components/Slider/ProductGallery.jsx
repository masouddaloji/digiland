import { useCallback, useState } from "react";
//packages
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Thumbs, Zoom } from "swiper";

//  Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
//utils
import { addImageFallback } from "../../utils/utils";
//styles
import "./ProductGallery.css";

const ProductGallery = ({ array = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperModules = [Zoom, Navigation, Thumbs, Autoplay];
  // state for magnifier
  const [isShowMagnifier, setIsShowMagnifier] = useState(false);
  const [magnifierSrc, setMagnifierSrc] = useState(null);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setImgSize] = useState([0, 0]);

  const handleMouseEnter = useCallback((e) => {
    const element = e.currentTarget;
    const { width, height } = element.getBoundingClientRect();
    setImgSize([width, height]);
    setMagnifierSrc(e?.target?.src);
    setIsShowMagnifier(true);
  },[]);

  const handleMouseLeave = useCallback(() => {
    setIsShowMagnifier(false);
  },[]);

  const handleMouseMove = useCallback((e) => {
    const element = e.currentTarget;
    const { top, left } = element.getBoundingClientRect();
    const x = e.touches
      ? e.touches[0].clientX - left - window.scrollX
      : e.pageX - left - window.scrollX;
    const y = e.touches
      ? e.touches[0].clientY - top - window.scrollY
      : e.pageY - top - window.scrollY;
    setXY([x, y]);
  },[]);

  return (
    <div className="productGallery">
      <Swiper
        spaceBetween={15}
        // navigation={true}
        dir="rtl"
        zoom={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={swiperModules}
        className="largSwiper"
        style={{ width: "100%" }}
      >
        {array?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="slider-larg-img-box">
              <img
                src={`https://digiland-app.iran.liara.run${item}`}
                onError={addImageFallback}
                alt="product image"
                className="product__largeImage"
                onTouchStart={handleMouseEnter}
                onMouseEnter={handleMouseEnter}
                onTouchEnd={handleMouseLeave}
                onMouseLeave={handleMouseLeave}
                onTouchMove={handleMouseMove}
                onMouseMove={handleMouseMove}
              />
              <div
                style={{
                  display: `${isShowMagnifier ? "" : "none"}`,
                  position: "absolute",
                  top: `${y - 60}px`,
                  left: `${x - 60}px`,
                  width: "120px",
                  height: "120px",
                  pointerEvents: "none",
                  border: " 2px solid var(--gray-50)",
                  backgroundImage: `url(${magnifierSrc})`,
                  backgroundSize: `${imgWidth * 2}px ${imgHeight * 2}px`,
                  backgroundPositionX: `${-x * 2 + 60}px`,
                  backgroundPositionY: `${-y * 2 + 60}px`,
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50%",
                  // transition:"0.1s"
                }}
              ></div>
            </div>
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
                src={`https://digiland-app.iran.liara.run${item}`}
                alt="product image"
                className="product__smallImage"
                onError={addImageFallback}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;
