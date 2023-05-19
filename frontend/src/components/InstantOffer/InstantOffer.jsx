//packages
import { Link } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";

//styles
import "./instantOffer.css";

const InstantOffer = (props) => {
  const { _id, title, image, offPrice, price, rating, status } = props;
  return (
    <>
      {status === "success" ? (
        <div className="instantOffer">
          <div className="instantOffer__titleBox">
            <span className="instantOffer__title">پیشنهاد لحظه ای</span>
          </div>
          <div className="instantOffer__imgBox">
            <img
              src={`http://localhost:8000${image}`}
              alt="instantOffer image"
              className="instantOffer__img"
            />
          </div>
          <Link
            className="instantOffer__ProductName"
            title={title}
            to={`product/${_id}`}
          >
            {title}
          </Link>
          <div className="priceBox ss02">
            <del>
              <bdi className="productPrice">{price}</bdi>
            </del>
            <span>
              <bdi className="currentPrice">
                {(price - (price * offPrice) / 100).toLocaleString()}
              </bdi>
              <span className="toman">تومان</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="instantOffer--skeleton">
          <Stack spacing={2} sx={{ padding: "0 .5rem" }}>
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ width: "60%", fontSize: "3rem", margin: "0 auto" }}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height="18rem"
            />
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: "2rem" }}
            />
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: "2rem" }}
            />
          </Stack>
        </div>
      )}
    </>
  );
};

export default InstantOffer;
