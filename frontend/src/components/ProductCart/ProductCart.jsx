//packages
import { Link } from "react-router-dom";
//hooks
import useBasket from "../../hooks/useBasket";
//components
import Star from "../Star/Star";
//icons
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";

//styles
import "./ProductCart.css";

export default function ProductCart(props) {
  const { _id, title, image, offPrice, price, rating } = props;
  const { addToBasketHandler,addToFavorite } = useBasket();
  return (
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
              <bdi className="productPrice ss02">{price.toLocaleString()}</bdi>
            </del>
           <span> <bdi className="currentPrice ss02">
              {(price - (price * offPrice) / 100).toLocaleString()}
            </bdi>
            <span className="toman">تومان</span></span>
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
            onClick={() => addToBasketHandler(_id)}
          >
            <MdOutlineAddShoppingCart className="Product__addToBasketIcon" />
            <span className="tooltip">افزودن به سبد خرید</span>
          </div>

          <div className="product__iconBox mainHasTooltip" onClick={()=>addToFavorite(_id)}>
            <IoMdHeartEmpty className="fullIcon" />
            <span className="tooltip">افزودن به علاقه مندی ها</span>
          </div>
        </div>
        <div className="product__leftBox">
          {Star(rating)}
        </div>
      </div>
    </div>
  );
}
