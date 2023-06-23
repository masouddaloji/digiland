
// packages
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
//components
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Slider from "../../components/Slider/Slider";
import CompanyProduct from "../../components/CompanyProduct/CompanyProduct";
//redux
import { nanoid } from "@reduxjs/toolkit";
import { useGetIndexInfosQuery } from "../../features/indexPage/indexApiSlice";
//hooks
import useTitle from "../../hooks/useTitle";
// icons
import { BiLayerPlus } from "react-icons/bi";
import { AiFillApple } from "react-icons/ai";
import { GrRss } from "react-icons/gr";
import { services } from "../../Constants";
//constanst
import { banners, smallBanners } from "../../Constants";
// styles
import "./Index.css";

export default function Index() {
  const {
    data: mainPage,
    isLoading,
    isError,
    isSuccess,
  } = useGetIndexInfosQuery();
  useTitle("دیجی لند")
  const articles = Array(6).fill(0);
  return (
    <div className="container">
      {/* header slider */}
      <section className="headerSlider">
        <div className="row">
          <div className="col-12 col-lg-9">
            <div className="widget">
              {/* banner */}
              <Slider
                isLoading={isLoading}
                isSuccess={isSuccess}
                spaceBetween={45}
                loop={isSuccess?true:false}
                autoplay={isSuccess?true:false}
                navigation={isSuccess?true:false}
                array={banners}
                slide="BannerBox"
              />
            </div>
          </div>
          {/* instantOffer */}
          <div className="col-lg-3 hideninstantOffer">
            <div className="instantOffer__wrapper">
              <Slider
                isLoading={isLoading}
                isSuccess={isSuccess}
                spaceBetween={10}
                pagination={true}
                loop={isSuccess?true:false}
                autoplay={isSuccess?true:false}
                array={mainPage?.suddenlySeggestedProducts}
                slide="instantOffer"
              />
            </div>
          </div>
        </div>
      </section>
      {/* services icon */}
      <div className="row">
        <div className="col">
          <Slider
            isLoading={isLoading}
            isSuccess={isSuccess}
            slidesPerView={8}
            spaceBetween={10}
            loop={isSuccess?true:false}
            autoplay={isSuccess?true:false}
            array={services}
            slide="serviceBox"
          />
        </div>
      </div>
      {/* amazin offer */}
      <section
        className={`amazinOffer ${isLoading ? "amazinOffer--skeleton" : null}`}
      >
        <div className="row">
          <div className="col-4 col-sm-3 col-md-2">
            <div className="amazinOffer__imgBox">
              {isLoading ? (
                <Skeleton variant="rounded" width="100%" height="100%" />
              ) : (
                <img
                  src="/images/offer-spc.png"
                  alt=""
                  className="amazinOffer__img"
                />
              )}
            </div>
          </div>
          <div className="col-8 col-sm-9 col-md-10">
            <Slider
              isLoading={isLoading}
              isSuccess={isSuccess}
              slidesPerView={4}
              spaceBetween={10}
              loop={isSuccess?true:false}
              navigation={isSuccess?true:false}
              autoplay={isSuccess?true:false}
              array={mainPage?.wonderfulSeggestedProducts}
              slide="SuggestedProductBox"
            />
          </div>
        </div>
      </section>
      {/* banner  */}
      <section className="bannerBoxes">
        <div className="row">
          {isSuccess
            ? smallBanners.map((banner) => (
                <div className="col col-md-4" key={banner.id}>
                  <div className="bannerBox">
                    <Link to={banner.link}>
                      <img
                        src={banner.image}
                        alt="banner image"
                        className="bannerBoxImg"
                      />
                    </Link>
                  </div>
                </div>
              ))
            : Array(3)
                .fill(0)
                .map((item, index) => (
                  <div className="col col-md-4" key={index + 1}>
                    <Skeleton animation="wave" height="14rem" width="100%" />
                  </div>
                ))}
        </div>
      </section>
      {/* new products */}
      <section className="newProduct">
        <div className="row">
          <div className="col">
            <SectionHeader
              title="جدیدترین محصولات"
              icon={<BiLayerPlus className="sectionHeader__icon" />}
              link="/"
              btnLink="/"
              bg="var(--main-backgroundColor)"
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Slider
              isLoading={isLoading}
              isSuccess={isSuccess}
              slidesPerView={5}
              spaceBetween={10}
              loop={isSuccess?true:false}
              navigation={isSuccess?true:false}
              array={mainPage?.latestProducts}
              slide="ProductCart"
            />
          </div>
        </div>
      </section>
      {/* apple products */}
      <section className="appleProduct">
        <div className="row">
          <div className="col">
            <SectionHeader
              title="محصولات اپل"
              icon={<AiFillApple className="sectionHeader__icon" />}
              bg="var(--main-backgroundColor)"
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="row">
          {isSuccess
            ? mainPage.latestApple.length > 0 &&
              mainPage.latestApple.map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item._id}>
                  <CompanyProduct
                    {...item}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                  />
                </div>
              ))
            : articles.map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={nanoid()}>
                  <CompanyProduct isLoading={isLoading} isSuccess={isSuccess} />
                </div>
              ))}
        </div>
      </section>
      {/* articles */}
      <section className="aricles">
        <div className="row">
          <div className="col-12">
            <SectionHeader
              title="دانش نامـه"
              link="/"
              btnLink="/"
              bg="var(--main-backgroundColor)"
              icon={<GrRss className="sectionHeader__icon" />}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Slider
              isLoading={isLoading}
              isSuccess={isSuccess}
              slidesPerView={4}
              autoplay={isSuccess?true:false}
              spaceBetween={10}
              loop={isSuccess?true:false}
              navigation={isSuccess?true:false}
              array={mainPage?.articles}
              slide="ArticleBox"
            />
          </div>
        </div>
      </section>
    </div>
     );
}
