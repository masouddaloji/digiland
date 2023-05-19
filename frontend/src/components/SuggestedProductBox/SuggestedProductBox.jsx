//packages
import { Link } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";
//icons
import { BsClockHistory } from "react-icons/bs";
//styles
import "./SuggestedProductBox.css";

export default function SuggestedProductBox(props) {
  const { _id, title, image, offPrice, price, rating, status } = props;
  return (
    <>
      {status === "success" ? (
        <div className="productBox">
          <h2 className="suggestedproduct__title" title={title}>
            <Link className="suggestedproduct__link" to={`/product/${_id}`}>
              {title}
            </Link>
          </h2>
          <div className="product__imgBox">
            <Link to={`/product/${_id}`}>
              <img
                src={`http://localhost:8000${image}`}
                alt="off product image"
                className="product__img"
              />
            </Link>
          </div>
          <div className="suggestedproduct__priceBox">
            <del>
              <bdi className="productPrice ss02 ">{price.toLocaleString()}</bdi>
            </del>
            <span>
              <bdi className="currentPrice ss02 ">
                {" "}
                {(price - (price * offPrice) / 100).toLocaleString()}
              </bdi>
              <span className="toman">تومان</span>
            </span>
          </div>
          <div className="suggestedproduct__time-Percent">
            <div className="suggestedproduct__percent">
              <span>{offPrice}%</span>
            </div>
            <div className="suggestedproduct__time">
              <span className="timer">38</span>:
              <span className="timer">08</span>:
              <span className="timer">35</span>:
              <span className="suggestedproduct__time-gold">12</span>
            </div>
            <div className="suggestedproduct__icon-box">
              <BsClockHistory className="fullIcon" />
            </div>
          </div>
        </div>
      ) : (
        <div className="productBox">
          <Stack spacing={1}>
            <Skeleton animation="wave" height="2rem" width="100%" />
            <Skeleton
              animation="wave"
              height="16rem"
              width="100%"
              variant="rounded"
            />
            <Skeleton animation="wave" height="2rem" width="100%" />
            <Skeleton animation="wave" height="2rem" width="100%" />
          </Stack>
        </div>
      )}
    </>
  );
}
