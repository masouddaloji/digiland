import { useState } from "react";
//packages
import { Link, useParams } from "react-router-dom";
import domPurify from "dompurify";
import { toast } from "react-toastify";
//rtk query
import { useAddToBasketMutation } from "../../features/basket/basketApiSlice";
import { useGetProductByIdQuery } from "../../features/Product/ProductApiSlice";
import { useAddToFavoriteMutation } from "../../features/favorite/favoriteApislice";
//components
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import ProductGallery from "../../components/Slider/ProductGallery";
import ProductCart from "../../components/ProductCart/ProductCart";
import Slider from "../../components/Slider/Slider";
import Loader from "../../components/Loader/Loader";
import Rating from "../../components/Rating/Rating";
import Error from "../../components/Error/Error";
//hooks
import useAuth from "../../hooks/useAuth";
//constanst
import { allInfosBtn } from "../../Constants";
//persianText
import { persianTexts } from "../../text";
//icons
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { AiOutlineRetweet } from "react-icons/ai";
import { BiCheckSquare } from "react-icons/bi";
import { FaTruck, FaRegHeart } from "react-icons/fa";
import { BsCheckLg, BsPen, BsXSquare } from "react-icons/bs";
import { CgList } from "react-icons/cg";
import { TbChecklist, TbTriangle, TbTriangleInverted } from "react-icons/tb";
//styles
import "./Product.css";

export default function Product() {
  const { productId } = useParams();
  const {
    data: product,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(productId);
  const [addToBasket] = useAddToBasketMutation();
  const [addToFavorite] = useAddToFavoriteMutation();
  const { userName } = useAuth();
  const [active, setActive] = useState("description");
  const [selectedColor, setSelectedColor] = useState();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const showRatingResultPersian = (rate) => {
    switch (rate) {
      case 5:
        return "عالی";
      case 4:
        return "خیلی خوب";
      case 3:
        return "خوب";
      case 2:
        return "متوسط";
      case 1:
        return "بد";

      default:
        break;
    }
  };
  const selectColorStyle = (persianColor) => {
    switch (persianColor) {
      case "قرمز":
        return { backgroundColor: "red" };
      case "مشکی":
        return { backgroundColor: "black" };
      case "طلائی":
        return { backgroundColor: "gold" };
      case "آبی":
        return { backgroundColor: "blue" };
      case "سبز":
        return { backgroundColor: "green" };
      case "سفید":
        return { backgroundColor: "white" };
      case "صورتی":
        return { backgroundColor: "pink" };

      default:
        break;
    }
  };

  const convertDateFormat = (englishDate) => {
    const date = new Date(englishDate);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const persianDate = new Intl.DateTimeFormat("fa", options).format(date);
    return persianDate;
  };
  const getRelatedProduct = () => {};

  const addToBasketHandler = async (id) => {
    if (userName) {
      await addToBasket(id)
        .unwrap()
        .then(() => {
          toast.success(persianTexts.basket.addtobasketSuccess);
        })
        .catch((error) => {
          toast.error(persianTexts.basket.addtobasketError);
        });
    } else {
      toast.warning(persianTexts.header.notLoginInBasket);
    }
  };
  const addToFavoriteHandler = async () => {
    if (userName) {
      await addToFavorite(productId).unwrap()
        .then((response) => {
          toast.success(persianTexts.favorite.addtoFavorite.success);
        })
        .catch((error) => {
          toast.error(persianTexts.favorite.addtoFavorite.error);
        });
    } else {
      toast.warning(persianTexts.header.notLoginInBasket);
    }
  };

  return (
    <div className={`product ${isLoading ? "product--loader" : null}`}>
      {isLoading ? (
        <Loader />
      ) : isSuccess ? (
        <div className="container">
          {/* bread crumbs */}
          {/* <Breadcrumb /> */}
          <div className="product__wrapper">
            <div className="row">
              {/* product images */}
              <div className="col-12 col-md-5 col-lg-5">
                <ProductGallery array={product?.gallery} />
              </div>
              {/* product details */}
              <div className="col-12 col-md-4 col-lg-4">
                <div>
                  <h2 className="product__detailsTitle">{product?.title}</h2>
                  <span className="product__detailsSubtitle">
                    {product?.segment}
                  </span>
                  <div className="product__detailsMeta">
                    <span className="product__detailsMetainfo">دسته : </span>
                    <span className="product__detailsMetainfo">
                      <Link to="/">موبایل</Link>
                    </span>
                  </div>
                  <ul className="product__detailsListInfos">
                    <li className="product__detailsItemInfos">
                      <span className="product__infosQuest">
                        حافظه داخلي :{" "}
                      </span>
                      <span className="product__infosAnswer">256 گيگابايت</span>
                    </li>
                    <li className="product__detailsItemInfos">
                      <span className="product__infosQuest">
                        تعداد سيم کارت :{" "}
                      </span>
                      <span className="product__infosAnswer">دو سيم کارت</span>
                    </li>
                    <li className="product__detailsItemInfos">
                      <span className="product__infosQuest">حس‌گرها : </span>
                      <span className="product__infosAnswer">
                        قطب‌نما (Compass)، شتاب‌سنج (Accelerometer)، مجاورت
                        (Proximity)، ژيروسکوپ (Gyro)
                      </span>
                    </li>
                    <li className="product__detailsItemInfos">
                      <span className="product__infosQuest">
                        شبکه هاي ارتباطي :{" "}
                      </span>
                      <span className="product__infosAnswer">2G، 3G، 4G</span>
                    </li>
                  </ul>
                  <div className="priceBox">
                    {product?.offPrice ? (
                      <>
                        <del>
                          <bdi className="product_info__price productPrice ss02">
                            {product?.price.toLocaleString()}
                          </bdi>
                        </del>
                        <span>
                          {" "}
                          <bdi className="product_info__price currentPrice ss02">
                            {(
                              product?.price -
                              (product?.price * product?.offPrice) / 100
                            ).toLocaleString()}
                          </bdi>
                          <span className="toman">تومان</span>
                        </span>
                      </>
                    ) : (
                      <bdi className="product_info__price currentPrice ss02">
                        {product?.price?.toLocaleString()}
                        <span className="toman">تومان</span>
                      </bdi>
                    )}
                  </div>
                  {/* select colors product */}
                  <div className="product__colorBox">
                    <div className="product__currentColor">
                      <span> رنگ : </span>
                      <span>{selectedColor ?? product?.colors[0]}</span>
                    </div>
                    <div className="colorAndAddTobasket__wrapper">
                      <div className="product__allColors">
                        {product?.colors?.map((color) => (
                          <div
                            style={selectColorStyle(color)}
                            className={`product__color ${
                              selectedColor === color ? "colorSelected" : null
                            } `}
                            onClick={() => setSelectedColor(color)}
                          >
                            {selectedColor === color && (
                              <BsCheckLg
                                className={`colorSelecteor ${
                                  selectedColor === "سفید" && "blacked"
                                }`}
                              />
                            )}{" "}
                          </div>
                        ))}
                      </div>
                      <button
                        className="product__addToBasket"
                        onClick={() => addToBasketHandler(productId)}
                      >
                        <MdOutlineAddShoppingCart className="product__addIcon" />
                        افزودن به سبد خرید
                      </button>
                    </div>
                  </div>

                  <div className="product__warning">
                    <p className="product__warningText">
                      <HiOutlineBellAlert className="product__warningIcon" />
                      {persianTexts.productInfo.warning}
                    </p>
                  </div>
                </div>
              </div>
              {/* details send */}
              <div className="col-12 col-md-3 col-lg-3">
                <div className="product__availbleBox">
                  <div className="product__availbleWrapper">
                    {product?.quantity ? (
                      <div className="product__availbleItem">
                        <BiCheckSquare className="product__availbleItemIcon available" />
                        موجود است
                      </div>
                    ) : (
                      <div className="product__availbleItem">
                        <BsXSquare className="product__availbleItemIcon notavailable" />
                        اتمام موجودی
                      </div>
                    )}

                    <div className="product__availbleItem">
                      <FaTruck className="product__availbleItemIcon truck" />
                      ارسال از <span>3</span> روز کاری آینده
                    </div>
                    <div className="product__availbleItem">
                      <button
                        className="product__availbleButton"
                        onClick={addToFavoriteHandler}
                      >
                        <FaRegHeart className="product__availbleBtnIcon" />
                        افزودن به علاقه مندی ها
                      </button>
                    </div>
                  </div>
                  <div className="product__services">
                    <div className="product__servicesItem">
                      <img
                        src="/images/productservices/1.png"
                        alt=""
                        className="product__servicesImg"
                      />
                      تضمین بهترین قیمت
                    </div>
                    <div className="product__servicesItem">
                      <img
                        src="/images/productservices/2.png"
                        alt=""
                        className="product__servicesImg"
                      />
                      ضمانت اصل بودن
                    </div>
                    <div className="product__servicesItem">
                      <img
                        src="/images/productservices/3.webp"
                        alt=""
                        className="product__servicesImg"
                      />
                      تحویل اکسپرس
                    </div>
                    <div className="product__servicesItem">
                      <img
                        src="/images/productservices/4.webp"
                        alt=""
                        className="product__servicesImg"
                      />
                      بسته بندی زیبا
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="product__tabListWrapper">
              <ul className="product__tabList">
                {allInfosBtn.map((btn) => (
                  <li className="product__tabItem" key={btn.id}>
                    <Link
                      className={`product__tabLink ${
                        active === btn.titleEn ? "product__tabLink--active" : ""
                      }`}
                      to="#"
                      onClick={() => setActive(btn.titleEn)}
                    >
                      {btn.titleFa}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="product__wrapper">
            <div className="row">
              {/* Description */}
              <div
                className={`allDetails ${
                  active === "description" ? "allDetails--show" : ""
                }`}
              >
                <div className="allDetails__headingWrapper">
                  <BsPen className="allDetails__headingIcon" />
                  <div className="allDetails__headingLeft">
                    <span className="allDetails__headingTitle">
                      نقد و بررسی اجمالی
                    </span>
                    <span className="allDetails__headingDesc">
                      {product?.segment}
                    </span>
                  </div>
                </div>
                <div className="allDetails__detailsBox">
                  <p
                    className="allDetails__detailsText"
                    dangerouslySetInnerHTML={{
                      __html: domPurify.sanitize(product?.shortDescription),
                    }}
                  ></p>
                </div>
              </div>
              {/* specifications */}
              <div
                className={`allDetails ${
                  active === "specifications" ? "allDetails--show" : ""
                }`}
              >
                <div className="allDetails__headingWrapper">
                  <CgList className="allDetails__headingIcon" />
                  <div className="allDetails__headingLeft">
                    <span className="allDetails__headingTitle">مشخصات کلی</span>
                    <span className="allDetails__headingDesc">
                      {product?.segment}
                    </span>
                  </div>
                </div>
                <div
                  className="details__tableWrapper"
                  dangerouslySetInnerHTML={{
                    __html: domPurify.sanitize(product?.fullDescription),
                  }}
                ></div>
              </div>
              {/* start userComments */}
              {/* <div
                className={`allDetails ${
                  active === "userComments" ? "allDetails--show" : ""
                }`}
              >
                <div className="allDetails__headingWrapper">
                  <BiCommentDetail className="allDetails__headingIcon" />
                  <div className="allDetails__headingLeft">
                    <span className="allDetails__headingTitle">
                      نظرات کاربران
                    </span>
                    <span className="allDetails__headingDesc">
                      {product?.segment}
                    </span>
                  </div>
                </div>
                <div className="userComments__wrapper">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="userComments__reviewRules">
                        <p
                          className="userComments__rulesText"
                          dangerouslySetInnerHTML={{
                            __html: domPurify.sanitize(
                              persianTexts.productInfo.commentRules
                            ),
                          }}
                        ></p>
                      </div>
                      <div className="resultReview__wrraper">
                        <h3 className="resultReview__title">
                          {persianTexts.productInfo.productRatingFromUsers}
                          <span>{product?.rating}</span>
                        </h3>
                        <div className="resultReview__points">
                          <div className="resultReview__point">
                            <span className="resultReview__pointTitle">
                              امتیاز کالا
                            </span>
                            <div className="resultReview__pointWrapper">
                              <div className="resultReview__pointProgress">
                                <span
                                  className="resultReview__pointProgressBar"
                                  style={{
                                    width: `${product?.rating * 20}%`,
                                  }}
                                ></span>
                              </div>
                              <span className="resultReview__pointResultText">
                                {showRatingResultPersian(product?.rating)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <Rating />
                    </div>
                  </div>
                  <div className="row">
                    <div className="allComments__wrapper">
                      <div className="allComments__header">
                        <h2 className="allComments__title">
                          نقد ها و بررسی ها
                          {product?.reviews?.length > 0 && (
                            <span>{product.reviews.length}</span>
                          )}
                        </h2>
                        <ul className="allComments__sorted">
                          <BsSortDown className="allComments__sorteIcon" />
                          <li className="allComments__sorteItem allComments__sorteItem--active">
                            جدیدترین
                          </li>
                          <li className="allComments__sorteItem">مفیدترین</li>
                        </ul>
                      </div>
                      <ul className="userComment__wrapper">
                        {product?.reviews?.length ? (
                          <>
                            {product?.reviews?.map((review) => (
                              <li
                                className="userComment__item"
                                key={review._id}
                              >
                                <div className="comment__content">
                                  <div className="comment__meta">
                                    <div
                                      className={`comment__metaRating ${
                                        review?.rating > 3
                                          ? "green"
                                          : review?.rating > 2
                                          ? "orange"
                                          : "red"
                                      }`}
                                    >
                                      <AiOutlineStar className="comment__metaIcon" />
                                      {review?.rating}
                                    </div>
                                    <span className="comment__metaAuthor">
                                      {review?.userId?.email?.split("@")[0]}
                                    </span>
                                    <span className="comment__time">
                                      {convertDateFormat(review?.createdAt)}
                                    </span>
                                  </div>
                                  <div className="comment__description">
                                    <p className="comment__descriptionText">
                                      {review?.description}
                                    </p>
                                  </div>
                                  <div className="comment__isLikeWrapper">
                                    <span className="comment__isLikeTitle">
                                      آیا این نظر برایتان مفید بود؟
                                    </span>
                                    <div className="comment__isLikeBtnWrapper">
                                      <span className="comment__isLikeBtn ">
                                        <span className="likedCount">71</span>
                                        بله
                                      </span>
                                      <span className="comment__isLikeBtn ">
                                        <span className="likedCount">14</span>
                                        خیر
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </>
                        ) : (
                          <Error
                            title={persianTexts.productInfo.notFindReviews}
                            type="warning"
                          />
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}
              {/*end userComments */}
              {/* start review */}
              <div
                className={`allDetails ${
                  active === "review" ? "allDetails--show" : ""
                }`}
              >
                <div className="allDetails__headingWrapper">
                  <TbChecklist className="allDetails__headingIcon" />
                  <div className="allDetails__headingLeft">
                    <span className="allDetails__headingTitle">
                      نقد و بررسی
                    </span>
                    <span className="allDetails__headingDesc">
                      {product?.segment}
                    </span>
                  </div>
                </div>
                <div className="reviews__wrapper">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-4">
                      <div className="pointGood__wrapper">
                        <span className="point__title">نقاط قوت</span>
                        <ul>
                          <li>
                            <TbTriangle className="pointGood__icon" />
                            کيفيت ساخت
                          </li>
                          <li>
                            <TbTriangle className="pointGood__icon" />
                            دوربين
                          </li>
                          <li>
                            <TbTriangle className="pointGood__icon" />
                            برند بودن
                          </li>
                          <li>
                            <TbTriangle className="pointGood__icon" />
                            چيپ ست
                          </li>
                          <li>
                            <TbTriangle className="pointGood__icon" />
                            طراحي منحصر بفرد
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4">
                      <div className="pointBad__wrapper">
                        <span className="point__title">نقاط ضعف</span>
                        <ul>
                          <li>
                            <TbTriangleInverted className="pointBad__icon" />
                            قيمت زياد
                          </li>
                          <li>
                            <TbTriangleInverted className="pointBad__icon" />
                            صفحه نمايش ضعيف IPS
                          </li>
                          <li>
                            <TbTriangleInverted className="pointBad__icon" />
                            قيمت وحشتناک بالا
                          </li>
                          <li>
                            <TbTriangleInverted className="pointBad__icon" />
                            اندروييد پايين
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4">
                      <div className="reviewprogress__wrapper">
                        <div className="reviewprogress__item">
                          <div className="reviewprogress__header">
                            <span>کیفیت ساخت</span>
                            <span>5.3</span>
                          </div>
                          <div className="reviewprogress__progress">
                            <span className="reviewprogress__progressBar"></span>
                          </div>
                        </div>
                        <div className="reviewprogress__item">
                          <div className="reviewprogress__header">
                            <span>ارزش خرید به نسبت قیمت</span>
                            <span>5.3</span>
                          </div>
                          <div className="reviewprogress__progress">
                            <span className="reviewprogress__progressBar"></span>
                          </div>
                        </div>
                        <div className="reviewprogress__item">
                          <div className="reviewprogress__header">
                            <span>نوآوری</span>
                            <span>5.3</span>
                          </div>
                          <div className="reviewprogress__progress">
                            <span className="reviewprogress__progressBar"></span>
                          </div>
                        </div>
                        <div className="reviewprogress__item">
                          <div className="reviewprogress__header">
                            <span>امکانات و قابلیت ها</span>
                            <span>5.3</span>
                          </div>
                          <div className="reviewprogress__progress">
                            <span className="reviewprogress__progressBar"></span>
                          </div>
                        </div>
                        <div className="reviewprogress__item">
                          <div className="reviewprogress__header">
                            <span>سهولت استفاده</span>
                            <span>5.3</span>
                          </div>
                          <div className="reviewprogress__progress">
                            <span className="reviewprogress__progressBar"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end review */}
            </div>
          </div>
          {/* related products */}
          <div className="row">
            <div className="col-12">
              <SectionHeader
                title="محصولات مرتبط"
                icon={<AiOutlineRetweet className="fullIcon" />}
                link="/"
                bg="var(--white)"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* {relatedProduct.length > 0 ? (
                  <Slider
                    slidesPerView={5}
                    spaceBetween={15}
                    loop={true}
                    navigation={true}
                    autoplay={true}
                    array={relatedProduct}
                    slide="ProductCart"
                  />
                ) : null} */}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
