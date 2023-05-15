import { useState } from 'react';
import SwiperCore, { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

SwiperCore.use([Thumbs]);

const ReactSwiperThumbs = ({ slides, address }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [magnifyX, setMagnifyX] = useState(0);
  const [magnifyY, setMagnifyY] = useState(0);

  const handleMagnify = (event) => {
    const image = event.target;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    const magnification = 2; // adjust magnification amount as needed
    setMagnifyX(x * magnification - width / 2);
    setMagnifyY(y * magnification - height / 2);
  }

  return (
    <div>
      <Swiper
        thumbs={{ swiper: thumbsSwiper }}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        zoom={false} // disable swiper zoom mode
        onSlideChange={({ activeIndex }) => setActiveIndex(activeIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide.image} alt={`Slide ${index}`} onClick={handleMagnify} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Magnifier Glass */}
      <div style={{ position: 'relative' }}>
        <img src={slides[activeIndex].image} alt={`Active Slide`} />
        <div
          style={{
            position: 'absolute',
            top: magnifyY,
            left: magnifyX,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        >
          <img src={slides[activeIndex].image} alt={`Magnified Active Slide`} style={{ width: '200%', height: '200%' }} />
        </div>
      </div>

      {/* Slider Component */}

      
    </div>
  );
};

export default ReactSwiperThumbs;