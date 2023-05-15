import { useEffect, useState } from "react";
// packages
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { Box, Stack } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
// styles
import "./Index.css";
//components
import axios from "../../api/axios";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Slider from "../../components/Slider/Slider";
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
        <div className="container">
          {/* banner slider skeleton */}
          <div className="row">
            <div className="col-12 col-lg-9">
              <Skeleton
                animation="wave"
                variant="rounded"
                width={"100%"}
                height={"42rem"}
              />
            </div>
            <div className="col-lg-3 hideninstantOffer">
              <Box
                sx={{
                  width: "100%",
                  height: "42rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--white)",
                  padding: "0 1rem 3rem",
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={"75%"}
                  height={"6rem"}
                  style={{ textAlign: "center" }}
                />
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  height={"20rem"}
                  width={"100%"}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={"100%"}
                  height={"6rem"}
                />
                <Skeleton animation="wave" variant="text" width={"60%"} />
              </Box>
            </div>
          </div>
          {/* services box slider skeleton */}
        </div>
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
                slidesPerView={8}
                spaceBetween={15}
                loop={true}
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
