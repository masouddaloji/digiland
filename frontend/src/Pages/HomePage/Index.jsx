import { useEffect, useState } from "react";
// packages
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
//components
import axios from "../../api/axios";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Slider from "../../components/Slider/Slider";
import CompanyProduct from "../../components/CompanyProduct/CompanyProduct";
//redux actions
import { getProductsMain } from "../../features/mainPageSlice";
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
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.mainPage);

  const articles = Array(6).fill(0);

  const [pageInfos, setPageInfos] = useState({
    newProducts: [],
    appleProducts: [],
    amazinOffer: [],
  });
  useEffect(() => {
    dispatch(getProductsMain({ limit: 200 }));
  }, []);
  useEffect(() => {
    if (status === "success") {
      const newProducts = data.slice(0, 6);
      const appleProducts = data
        .filter((item) => item.brand === "apple")
        .slice(0, 6);
      const amazinOffer = data.filter((product) => product.offPrice >= 10);
      setPageInfos({ newProducts, appleProducts, amazinOffer });
    }
  }, [data, status]);

  return (
    <div className="container">
      {/* header slider */}
      <section className="headerSlider">
        <div className="row">
          <div className="col-12 col-lg-9">
            <div className="widget">
              {/* banner */}
              <Slider
                status={status}
                spaceBetween={45}
                loop={status === "success" ? true : false}
                autoplay={status === "success" ? true : false}
                navigation={status === "success" ? true : false}
                array={banners}
                slide="BannerBox"
              />
            </div>
          </div>
          {/* instantOffer */}
          <div className="col-lg-3 hideninstantOffer">
            <div className="instantOffer__wrapper">
              <Slider
                status={status}
                spaceBetween={15}
                pagination={status === "success" ? true : false}
                loop={status === "success" ? true : false}
                autoplay={status === "success" ? true : false}
                array={pageInfos.amazinOffer}
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
            status={status}
            slidesPerView={8}
            spaceBetween={15}
            loop={status === "success" ? true : false}
            autoplay={status === "success" ? true : false}
            array={services}
            slide="serviceBox"
          />
        </div>
      </div>
      {/* amazin offer */}
      <section
        className={`amazinOffer ${
          status === "loading" ? "amazinOffer--skeleton" : null
        }`}
      >
        <div className="row">
          <div className="col-4 col-sm-3 col-md-2">
            <div className="amazinOffer__imgBox">
              {status === "loading" ? (
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
              status={status}
              slidesPerView={4}
              spaceBetween={15}
              loop={status === "success" ? true : false}
              navigation={true}
              autoplay={status === "success" ? true : false}
              array={pageInfos.amazinOffer}
              slide="SuggestedProductBox"
            />
          </div>
        </div>
      </section>
      {/* banner  */}
      <section className="bannerBoxes">
        <div className="row">
          {status === "success"
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
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Slider
              status={status}
              slidesPerView={5}
              spaceBetween={15}
              loop={status === "success" ? true : false}
              navigation={true}
              array={pageInfos.newProducts}
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
            />
          </div>
        </div>
        <div className="row">
          {status === "success"
            ? pageInfos?.appleProducts?.length > 0 &&
              pageInfos.appleProducts.map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item._id}>
                  <CompanyProduct {...item} status={status} />
                </div>
              ))
            : articles.map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item._id}>
                  <CompanyProduct status={status} />
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
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Slider
              status={status}
              slidesPerView={4}
              autoplay={status === "success" ? true : false}
              spaceBetween={15}
              loop={status === "success" ? true : false}
              navigation={true}
              array={articles}
              slide="ArticleBox"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
