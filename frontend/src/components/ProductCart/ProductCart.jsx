//packages
import { Link } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";
import { toast } from "react-toastify";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, getBasket } from "../../features/basketSlice";
import { selectToken } from "../../features/auth/authSlice";
//rtk query
import { useAddToBasketMutation } from "../../features/basket/basketApiSlice";
//components
import Star from "../Star/Star";
//persian text
import { persianTexts } from "../../text";
//icons
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";

//styles
import "./ProductCart.css";

export default function ProductCart(props) {
  const[addToBasket]=useAddToBasketMutation()
  const token=useSelector(selectToken)
  const dispatch = useDispatch();
  const { _id, title, image, offPrice, price, rating,  isLoading, isSuccess  } = props;

  const addToBasketHandler = async() => {
    // dispatch(addToBasket({ id: _id, token: token })).then(() =>
    //   dispatch(getBasket(token))
    // );
    await addToBasket(_id).unwrap()
    .then(()=>{
      toast.success(persianTexts.basket.addtobasketSuccess)
    })
    .catch((error)=>{
      toast.error(persianTexts.basket.addtobasketError)
    })
  };
  return (
    <>
      {isSuccess ? (
        <div className="productBox">
          <div className="product__imgBox">
            <img
              src={`http://localhost:8000${image}`}
              alt="new product image"
              className="product__img"
            />
          </div>
          <Link to={`/product/${_id}`}>
            <h2 className="product__title" title={title}>
              {title}
            </h2>
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
              <div
                className="product__addToBasketBox mainHasTooltip"
                onClick={addToBasketHandler}
              >
                <MdOutlineAddShoppingCart className="Product__addToBasketIcon" />
                <span className="tooltip">افزودن به سبد خرید</span>
              </div>

              <div
                className="product__iconBox mainHasTooltip"
                onClick={() => addToFavorite(_id)}
              >
                <IoMdHeartEmpty className="fullIcon" />
                <span className="tooltip">افزودن به علاقه مندی ها</span>
              </div>
            </div>
            <div className="product__leftBox">{Star(rating)}</div>
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
