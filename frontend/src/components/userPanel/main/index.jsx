
//packages
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//rtk query
import { useGetFavoriteQuery, useRemoveFromFavoriteMutation } from "../../../features/favorite/favoriteApislice";
import { useGetUserByIdQuery } from "../../../features/user/userApiSlice";
//hooks
import useAuth from "../../../hooks/useAuth";
import useConvertDate from "../../../hooks/useConvertDate";
import useTitle from "../../../hooks/useTitle";
//components
import UserMainItem from "../UserMainItem/UserMainItem";
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error";
//icons
import { BsFileEarmarkExcel } from "react-icons/bs";
import { FaAngleLeft, FaMoneyCheckAlt } from "react-icons/fa";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
//persian text
import { persianTexts } from "../../../text";
//styles
import "./main.css";

const MainPanel = () => {
  const { userID } = useAuth();
  const {
    data: userInfos,
    isLoading: userInfosLoading,
    isSuccess: userInfosSuccess,
  } = useGetUserByIdQuery(userID);
  const {
    data: favoriteProducts,
    isLoading: favoriteProductsLoading,
    isSuccess: favoriteProductsSuccess,
  } = useGetFavoriteQuery();
  const userorderItem = [
    {
      id: nanoid(),
      title: "سفارش تکمیل شده",
      count: 0,
      icon: <HiOutlineDocumentCheck className="userItem__icon" />,
    },
    {
      id: nanoid(),
      title: "سفارش در انتظار بررسی",
      count: 3,
      icon: <MdOutlineContentPasteSearch className="userItem__icon" />,
    },
    {
      id: nanoid(),
      title: "سفارش در انتظار پرداخت",
      count: 1,
      icon: <FaMoneyCheckAlt className="userItem__icon" />,
    },
    {
      id: nanoid(),
      title: "سفارش لغو شده",
      count: 0,
      icon: <BsFileEarmarkExcel className="userItem__icon" />,
    },
  ];
  const [removeFromFavorite] = useRemoveFromFavoriteMutation();
  let lastOrders;
  if (userInfosSuccess) {
    lastOrders = userInfos?.orders?.slice(0, 2);
  }
  const removeFromFavoriteHandler = (id) => {
    removeFromFavorite(id)
      .unwrap()
      .then((response) => {
        toast.success(persianTexts.favorite.removeFromFavorite.success);
      })
      .catch((error) => {
        toast.error(persianTexts.favorite.removeFromFavorite.error);
      });
  }

  useTitle("حساب کاربری");
  return (
    <>
      {userInfosLoading && favoriteProductsLoading && <Loader />}
      {userInfosSuccess && favoriteProductsSuccess && (
        <div className="userMain">
          {/* <div className="row"> */}
          <div className="user__item-wrapper">
            {userorderItem.map((item) => (
              <UserMainItem {...item} key={item.id} />
            ))}
          </div>
          {/* </div> */}
          <div className="row">
            {/* start user detalis */}
            <div className="col-12 col-lg-6">
              <div className="userDetails">
                <div className="userDetails__header">
                  <span>اطلاعات شخصی</span>
                  <Link to="/usersetting" className="userDetails__header-link">
                    <FaAngleLeft className="userDetails__header-icon" />
                    ویرایش اطلاعات
                  </Link>
                </div>
                <div className="userDetails__content ss02">
                  <div className="userDetails__item">
                    <span>نام</span>
                    <span>
                      {userInfos?.name ??"ثبت نشده"}
                    </span>
                  </div>
                  <div className="userDetails__item">
                    <span>شماره موبایل</span>
                    <span>{userInfos?.phone??"ثبت نشده"}</span>
                  </div>
                  <div className="userDetails__item">
                    <span>ایمیل</span>
                    <span>{userInfos.email??"ثبت نشده"}</span>
                  </div>
                  <div className="userDetails__item">
                    <span>عضویت</span>
                    <span>{useConvertDate(userInfos.createdAt)}</span>
                  </div>
                  <div className="userDetails__item">
                    <span>شهر</span>
                    <span>{userInfos?.addresses?.[0]?.city??"ثبت نشده"}</span>
                  </div>
                  <div className="userDetails__item">
                    <span>کدپستی</span>
                    <span>{userInfos?.addresses?.[0]?.postalCode??"ثبت نشده"}</span>
                  </div>
                  <div className="userDetails__item">
                    <span>آدرس</span>
                    <span>{userInfos?.addresses?.[0]?.street??"ثبت نشده"}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* end user detalis */}
            {/* start user favorite */}
            <div className="col-12 col-lg-6">
              <div className="userDetails">
                <div className="userDetails__header">
                  <span>آخرین علاقه مندی ها</span>
                  <Link to="/userfavorite" className="userDetails__header-link">
                    <FaAngleLeft className="userDetails__header-icon" />
                    مشاهده همه
                  </Link>
                </div>
                <div className="favorite__item-wrapper">
                  {favoriteProducts?.length ? (
                    favoriteProducts.map((product) => (
                      <div className="favorite__item" key={product._id}>
                        <div className="favorite__item-imageBox">
                          <img
                            src={`http://localhost:8000${product.image}`}
                            alt=""
                            className="favorite__item-image"
                          />
                        </div>
                        <h4 className="favorite__item-title">
                          {product.title}
                        </h4>
                        <div className="favorite__item-btns">
                          <Link
                            to={`/product/${product._id}`}
                            className="favorite__item-btn favorite__item-show"
                          >
                            {persianTexts.favorite.showBtn}
                          </Link>
                          <button
                            className="favorite__item-btn favorite__item-delete"
                            onClick={() =>
                              removeFromFavoriteHandler(product._id)
                            }
                          >
                            {persianTexts.favorite.deleteBtn}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="pad1">
                    <Error
                      type="warning"
                      title={persianTexts.favorite.notFound}
                    />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* end user favorite */}
          </div>
          {/* start user order */}
          <div className="row">
            <div className="col-12">
              <div className="userMain__orders">
                <div className="userDetails__header">
                  <span>آخرین سفارشات</span>
                  <Link to="/usersetting" className="userDetails__header-link">
                    <FaAngleLeft className="userDetails__header-icon" />
                    مشاهده همه
                  </Link>
                </div>
                {lastOrders?.length ? (
                  <div>
                    {lastOrders.map((order) => (
                      <div className="order__item ss02" key={order._id}>
                        <div>کد سفارش : {order._id}</div>
                        <div>{useConvertDate(order.createdAt)}</div>
                        <div>
                          {order.status === "pending"
                            ? "در انتظار بررسی"
                            : order.status === "delivered"
                            ? "تایید شده"
                            : "رد شده"}
                        </div>
                        <div>
                          {order.productId.price.toLocaleString()} تومان
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pad1">
                    <Error
                      type="warning"
                      title={persianTexts.userOrders.notFound}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* end user order */}
        </div>
      )}
    </>
  );
};

export default MainPanel;
