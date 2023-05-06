import React, { useContext, useEffect, useState } from "react";
// packages
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
// styles
import "./Index.css";
//components
import axios from "../../api/axios";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Slider from "../../components/Slider/Slider";
import Loader from "./../../components/Loader/Loader";
import CompanyProduct from "../../components/CompanyProduct/CompanyProduct";
// icons

import { BiLayerPlus } from "react-icons/bi";
import { AiFillApple } from "react-icons/ai";
import { GrRss } from "react-icons/gr";
import { services } from "../../Constants";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);

  const banners = [
    { id: 101, link: "/", cover: "/images/widget/widget-img-1.png" },
    { id: 202, link: "/", cover: "/images/widget/widget-img-2.png" },
    { id: 303, link: "/", cover: "/images/widget/widget-img-3.png" },
    { id: 404, link: "/", cover: "/images/widget/widget-img-4.png" },
  ];
  const articles = Array(6).fill(0);

  const suggestionProduct = [
    {
      id: 1,
      title: "گوشی موبايل سامسونگ مدل Galaxy S8 Plus SM-G955FD دو سيم کارت",
      cover: "./images/sug/sug6.jpg",
      productPrice: 15000000,
      currentPrice: 13800000,
      link: "/",
      offerTime: { day: 5, hour: 14 },
      percent: 8,
    },
    {
      id: 2,
      title:
        "گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت 128 گیگابایت",
      cover: "./images/sug/sug4.jpg",
      productPrice: 17200000,
      currentPrice: 16400000,
      link: "/",
      offerTime: { day: 3, hour: 1 },
      percent: 5,
    },
    {
      id: 3,
      title:
        "گوشی موبایل اپل مدل iPhone 12 A2404 دو سیم‌ کارت ظرفیت 128 گیگابایت",
      cover: "./images/sug/sug5.webp",
      productPrice: 21000000,
      currentPrice: 19900000,
      link: "/",
      offerTime: { day: 1, hour: 14 },
      percent: 5,
    },
    {
      id: 4,
      title: "لپ تاپ 17 اينچي الين وير مدل 17 AW17R3",
      cover: "./images/sug/sug1.jpg",
      productPrice: 36000000,
      currentPrice: 35100000,
      link: "/",
      offerTime: { day: 3, hour: 21 },
      percent: 2.5,
    },
    {
      id: 5,
      title: "تلويزيون ال اي دي هوشمند خميده سامسونگ مدل 88KS9800 سايز 88 اينچ",
      cover: "./images/sug/sug2.jpg",
      productPrice: 15000000,
      currentPrice: 1400000,
      link: "/",
      offerTime: { day: 1, hour: 1 },
      percent: 7,
    },
    {
      id: 6,
      title: "دوربین ديجيتال نيکون مدل Coolpix P900",
      cover: "./images/sug/sug3.jpg",
      productPrice: 8000000,
      currentPrice: 6700000,
      link: "/",
      offerTime: { day: 1, hour: 4 },
      percent: 7,
    },
  ];
  const [allProducts, setAllProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [appleProducts, setAppleProducts] = useState([]);
  const [amazinOffer, setAmazinOffer] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("products?limit={200}")
      .then((res) => {
        console.log(res.data);
        setAllProducts(res?.data?.data);
        const newProductsSlice = res?.data?.data.slice(0, 6);
        setNewProducts(newProductsSlice);
        const apple = res?.data?.data?.filter((item) => item.brand === "apple");
        setAppleProducts(apple);
        const amazin = res?.data?.data.filter(
          (product) => product.offPrice >= 10
        );
        setAmazinOffer(amazin);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader message="در حال دریافت اطلاعات" />
      ) : (
        <div className="container">
          {/* header slider */}
          <section className="headerSlider">
            <div className="row">
              <div className="col-12 col-lg-9">
                <div className="widget">
                  {/* banner */}
                  <Slider
                    spaceBetween={45}
                    loop={true}
                    autoplay={true}
                    navigation={true}
                    array={banners}
                    slide="BannerBox"
                  />
                </div>
              </div>
              {/* instantOffer */}
              <div className="col-lg-3 hideninstantOffer">
                <div className="instantOffer__wrapper">
                  <Slider
                    spaceBetween={15}
                    pagination={true}
                    loop={true}
                    autoplay={true}
                    array={amazinOffer}
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
                slidesPerView={5}
                spaceBetween={15}
                loop={true}
                navigation={true}
                autoplay={true}
                array={services}
                slide="serviceBox"
              />
            </div>
          </div>
          {/* amazin offer */}
          <section className="amazinOffer">
            <div className="row">
              <div className="col-4 col-sm-3 col-md-2">
                <div className="amazinOffer__imgBox">
                  <img
                    src="/images/offer-spc.png"
                    alt=""
                    className="amazinOffer__img"
                  />
                </div>
              </div>
              <div className="col-8 col-sm-9 col-md-10">
                <Slider
                  slidesPerView={4}
                  spaceBetween={15}
                  loop={true}
                  navigation={true}
                  autoplay={true}
                  array={amazinOffer}
                  slide="SuggestedProductBox"
                />
              </div>
            </div>
          </section>
          {/* banner  */}
          <section className="bannerBoxes">
            <div className="row">
              <div className="col col-md-4">
                <div className="bannerBox">
                  <Link to="/">
                    <img
                      src="/images/banner-2.webp"
                      alt="banner image"
                      className="bannerBoxImg"
                    />
                  </Link>
                </div>
              </div>
              <div className="col col-md-4">
                <div className="bannerBox">
                  <Link to="/">
                    <img
                      src="/images/banner-3.webp"
                      alt="banner image"
                      className="bannerBoxImg"
                    />
                  </Link>
                </div>
              </div>
              <div className="col col-md-4">
                <div className="bannerBox">
                  <Link to="/">
                    <img
                      src="/images/banner-1.webp"
                      alt="banner image"
                      className="bannerBoxImg"
                    />
                  </Link>
                </div>
              </div>
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
                  slidesPerView={5}
                  spaceBetween={15}
                  loop={true}
                  navigation={true}
                  // autoplay={true}
                  array={newProducts}
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
              {appleProducts.length &&
                appleProducts.map((item) => (
                  <div className="col-12 col-md-6 col-lg-4" key={item._id}>
                    <CompanyProduct {...item} />
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
                  slidesPerView={4}
                  autoplay={true}
                  spaceBetween={15}
                  loop={true}
                  navigation={true}
                  array={articles}
                  slide="ArticleBox"
                />
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
