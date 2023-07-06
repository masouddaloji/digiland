//packages
import { Link } from "react-router-dom";
import { Skeleton, Stack, Tooltip } from "@mui/material";
//utils
import { addImageFallback } from "../../utils/utils";
//styles
import "./instantOffer.css";

const InstantOffer = (props) => {
  const { _id, title, image, offPrice, price, rating, isLoading, isSuccess } =
    props;
    
  return (
    <>
      {isSuccess ? (
        <div className="instantOffer">
          <div className="instantOffer__titleBox">
            <span className="instantOffer__title">پیشنهاد لحظه ای</span>
          </div>
          <div className="instantOffer__imgBox">
            <img
              src={`https://digiland-app.iran.liara.run${image}`}
              alt="instantOffer image"
              className="instantOffer__img"
              onError={addImageFallback}
            />
          </div>
          <Tooltip placement="bottom" arrow title= {title} classes={{ tooltip: "custom__tooltip" }}>
          <Link
            className="instantOffer__ProductName"
            to={`product/${_id}`}
          >
            {title}
          </Link>
          </Tooltip>
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
      ) : isLoading ? (
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
      ) : null}
    </>
  );
};

export default InstantOffer;
