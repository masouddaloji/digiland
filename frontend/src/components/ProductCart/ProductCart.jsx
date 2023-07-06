import { useCallback } from "react";
//packages
import { Link } from "react-router-dom";
import { Skeleton, Stack, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
//redux
import { useSelector } from "react-redux";
import { selectToken } from "../../features/auth/authSlice";
//rtk query
import { useAddToBasketMutation } from "../../features/basket/basketApiSlice";
import { useAddToFavoriteMutation } from "../../features/favorite/favoriteApislice";
//components
import Star from "../Star/Star";
//persian text
import { persianTexts } from "../../text";
//icons
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
//utils
import { addImageFallback } from "../../utils/utils";
//styles
import "./ProductCart.css";



export default function ProductCart(props) {
  const token=useSelector(selectToken)
  const[addToBasket]=useAddToBasketMutation()
  const[addToFavorite]=useAddToFavoriteMutation()
  const { _id, title, image, offPrice, price, rating,  isLoading, isSuccess  } = props;
  const addToBasketHandler = useCallback(async() => {
if(token){
  await addToBasket(_id).unwrap()
  .then(()=>{
    toast.success(persianTexts.basket.addtobasketSuccess)
  })
  .catch((error)=>{
    toast.error(persianTexts.basket.addtobasketError)
  })
}else{
  toast.warning(persianTexts.basket.notLoginForaddTobasket)
}
  },[]);

  const addToFavoriteHandler =useCallback( async() => {
  if(token){
    await addToFavorite(_id).unwrap()
    .then(()=>{
      toast.success(persianTexts.favorite.addtoFavorite.success)
    })
    .catch((error)=>{
      toast.error(persianTexts.favorite.addtoFavorite.error)
    })
  }else{
    toast.warning(persianTexts.favorite.addtoFavorite.notLogin)
  }
  },[]);

  return (
    <>
      {isSuccess ? (
        <div className="productBox">
          <div className="product__imgBox">
            <img
              src={`https://digiland-app.iran.liara.run${image}`}
              onError={addImageFallback}
              alt="new product image"
              className="product__img"
            />
          </div>

        <div className="productBox__content">
        <Link to={`/product/${_id}`}>
          <Tooltip arrow title={title} classes={{ tooltip: "custom__tooltip" }}>
            <h2 className="product__title">
              {title}
            </h2>
            </Tooltip>
          </Link>
          <div className="priceBox">
            {offPrice ? (
              <>
                <del>
                  <bdi className="productPrice ss02">
                    {price.toLocaleString()}
                  </bdi>
                </del>
                <span>
                  {" "}
                  <bdi className="currentPrice ss02">
                    {(price - (price * offPrice) / 100).toLocaleString()}
                  </bdi>
                  <span className="toman">تومان</span>
                </span>
              </>
            ) : (
              <bdi className="currentPrice ss02">
                {price.toLocaleString()}
                <span className="toman">تومان</span>
              </bdi>
            )}
          </div>
          <div className="product__quickAccessBox">
            <div className="product__rightBox">
              <Tooltip placement="top" arrow title="افزودن به سبد خرید" classes={{ tooltip: "custom__tooltip" }}>
              <div
                className="product__addToBasketBox cursor"
                onClick={addToBasketHandler}
              >
                <MdOutlineAddShoppingCart className="Product__addToBasketIcon" />
              </div>
                </Tooltip>
                <Tooltip placement="top" arrow title="افزودن به علاقه مندی ها" classes={{ tooltip: "custom__tooltip" }}>
              <div
                className="product__iconBox cursor"
                onClick={() => addToFavoriteHandler(_id)}
              >
                <IoMdHeartEmpty className="fullIcon favorite__icon" />
              </div>
              </Tooltip>
            </div>
            <div className="product__leftBox">{Star(rating)}</div>
          </div>
        </div>
        </div>
      ) :isLoading? (
        <div className="productBox">
          <Stack spacing={1}>
            <Skeleton
              animation="wave"
              height="16rem"
              width="100%"
              variant="rounded"
            />
            <Skeleton animation="wave" height="4rem" width="100%" />
            <Skeleton animation="wave" height="2rem" width="100%" />
            <Skeleton animation="wave" height="2rem" width="100%" />
          </Stack>
        </div>
      ):null}
    </>
  );
}
