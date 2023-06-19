//packages
import { nanoid } from "@reduxjs/toolkit"
import { Link } from "react-router-dom"
//rtk query
import { useGetFavoriteQuery } from "../../../features/favorite/favoriteApislice"
import { useGetUserByIdQuery } from "../../../features/user/userApiSlice"
//hooks
import useAuth from "../../../hooks/useAuth"
import useConvertDate from "../../../hooks/useConvertDate"
//components
import UserMainItem from "../UserMainItem/UserMainItem"
import Loader from "../../Loader/Loader"
//icons
import { BsFileEarmarkExcel } from "react-icons/bs"
import { FaAngleLeft, FaMoneyCheckAlt } from "react-icons/fa"
import { MdOutlineContentPasteSearch } from "react-icons/md"
import { HiOutlineDocumentCheck } from "react-icons/hi2"
//persian text
import { persianTexts } from "../../../text"
//styles
import './main.css'


const MainPanel = () => {
  const { userID } = useAuth();
  const { data:userInfos, isLoading:userInfosLoading, isSuccess:userInfosSuccess } = useGetUserByIdQuery(userID);
  const {
    data: favoriteProducts,
    isLoading:favoriteProductsLoading,
    isSuccess:favoriteProductsSuccess,
  } = useGetFavoriteQuery();
  const userorderItem=[
    {id:nanoid(),title:"سفارش تکمیل شده",count:0,icon:<HiOutlineDocumentCheck className="userItem__icon"/>},
    {id:nanoid(),title:"سفارش در انتظار بررسی",count:3,icon:<MdOutlineContentPasteSearch className="userItem__icon"/>},
    {id:nanoid(),title:"سفارش در انتظار پرداخت",count:1,icon:<FaMoneyCheckAlt className="userItem__icon"/>},
    {id:nanoid(),title:"سفارش لغو شده",count:0,icon:<BsFileEarmarkExcel className="userItem__icon"/>},
  ]
  return (
   <>
     {userInfosLoading && 
      favoriteProductsLoading && <Loader />}
    {
      userInfosSuccess && favoriteProductsSuccess && <div className="userMain">
      <div className="row">
      {userorderItem.map(item=>(
        <div className="col-12 col-md-6 col-lg-3" key={item.id}>
          <UserMainItem {...item}/>
        </div>
      ))}
        
      </div>
      <div className="row">
      {/* start user detalis */}
        <div className="col-12 col-lg-6">
          <div className="userDetails">
            <div className="userDetails__header">
              <span>اطلاعات شخصی</span>
              <Link to="/usersetting" className="userDetails__header-link">
              <FaAngleLeft className="userDetails__header-icon"/>
              ویرایش اطلاعات
              </Link>
            </div>
            <div className="userDetails__content ss02">
              <div className="userDetails__item">
                <span>نام</span>
                <span>{userInfos.email.split("@")[0]}</span>
              </div>
              <div className="userDetails__item">
                <span>شماره موبایل</span>
                <span>09165478965</span>
              </div>
              <div className="userDetails__item">
                <span>ایمیل</span>
                <span>{userInfos.email}</span>
              </div>
              <div className="userDetails__item">
                <span>عضویت</span>
                <span>{useConvertDate(userInfos.createdAt)}</span>
              </div>
              <div className="userDetails__item">
                <span>شهر</span>
                <span>کوهدشت</span>
              </div>
              <div className="userDetails__item">
                <span>کدپستی</span>
                <span>6841689654</span>
              </div>
              <div className="userDetails__item">
                <span>آدرس</span>
                <span>شهرک شهید رجایی سی متری دوم</span>
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
              <FaAngleLeft className="userDetails__header-icon"/>
              مشاهده همه
              </Link>
            </div>
          <div className="favorite__item-wrapper">

        {favoriteProducts?.length &&
              favoriteProducts.map((product) => (
                <div className="favorite__item" key={product._id}>
                  <div className="favorite__item-imageBox">
                    <img
                      src={`http://localhost:8000${product.image}`}
                      alt=""
                      className="favorite__item-image"
                    />
                  </div>
                  <h4 className="favorite__item-title">{product.title}</h4>
                  <div className="favorite__item-btns">
                    <Link
                      to={`/product/${product._id}`}
                      className="favorite__item-btn favorite__item-show"
                    >
                      {persianTexts.favorite.showBtn}
                    </Link>
                    <button
                      className="favorite__item-btn favorite__item-delete"
                      onClick={() => removeFromFavoriteHandler(product._id)}
                    >
                      {persianTexts.favorite.deleteBtn}
                    </button>
                  </div>
                </div>
              ))}
       


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
              <FaAngleLeft className="userDetails__header-icon"/>
              مشاهده همه
              </Link>
            </div>
            <div className="orders__list">
              <div className="order__item ss02">
              <div>کد سفارش : 2468</div>
              <div>۲۹ خرداد ۱۴۰۲</div>
              <div>در انتظار بررسی</div>
              <div>54,500,000 تومان</div>
              </div>
            </div>
              </div>
        </div>
      </div>
    {/* end user order */}
    </div>
    }
   </>
  )
}

export default MainPanel