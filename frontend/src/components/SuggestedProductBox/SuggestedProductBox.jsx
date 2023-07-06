//packages
import { Link } from "react-router-dom";
import { Skeleton, Stack, Tooltip } from "@mui/material";
//components
import Timer from "../Timer/Timer";
//utils
import { addImageFallback } from "../../utils/utils";
//styles
import "./SuggestedProductBox.css";

export default function SuggestedProductBox(props) {
  const { _id, title, image, offPrice, price, rating, isLoading, isSuccess } =
    props;
  return (
    <>
      {isSuccess ? (
        <div className="productBox ss02">
          <Tooltip
            placement="top"
            arrow
            title={title}
            classes={{ tooltip: "custom__tooltip" }}
          >
            <h2 className="suggestedproduct__title">
              <Link className="suggestedproduct__link" to={`/product/${_id}`}>
                {title}
              </Link>
            </h2>
          </Tooltip>
          <div className="product__imgBox">
            <Link to={`/product/${_id}`}  className="suggestedproduct__imgLink">
              <img
                src={`https://digiland-app.iran.liara.run${image}`}
                alt="off product image"
                className="product__img"
                onError={addImageFallback}
              />
            </Link>
          </div>
         <div className="productBox__content">
           
         <div className="suggestedproduct__priceBox">
            {offPrice ? (
              <>
                <del>
                  <bdi className="productPrice ss02 ">
                    {price.toLocaleString()}
                  </bdi>
                </del>
                <span>
                  <bdi className="currentPrice ss02 ">
                    {" "}
                    {(price - (price * offPrice) / 100).toLocaleString()}
                  </bdi>
                  <span className="toman">تومان</span>
                </span>
              </>
            ) : (
              <span>
                  <bdi className="currentPrice ss02 ">
                    {" "}
                    {price.toLocaleString()}
                  </bdi>
                  <span className="toman">تومان</span>
                </span>
            )}
          </div>
          {/* start timer */}
          <Timer offPrice={offPrice}/>
          {/* end timer */}
         </div>
        </div>
      ) : isLoading ? (
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
      ) : null}
    </>
  );
}
