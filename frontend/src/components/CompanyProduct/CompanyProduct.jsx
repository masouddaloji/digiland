//packages
import { Link } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";
//icons
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosStar } from "react-icons/io";
//utils
import { addImageFallback } from "../../utils/utils";
//styles
import "./CompanyProduct.css";

export default function CompanyProduct(props) {
  const { _id, title, image, price, offPrice, rating, isLoading, isSuccess } =
    props;
  return (
    <>
      {isSuccess ? (
        <div className="companyProduct">
          <Link to={`/product/${_id}`} className="companyProduct__link">
              <img
                className="CompanyProduct__img"
                src={`https://digiland-app.iran.liara.run${image}`}
                alt="CompanyProduct image"
                onError={addImageFallback}
              />

            <div className="CompanyProduct__info">
              <div>
                <h3 className="CompanyProduct__title" title={title}>
                  {title}
                </h3>
                <div className="companyProduct__details">
                  <div>
                    {offPrice ? (
                      <>
                        <del>
                          <bdi className="productPrice ss02">
                            {price.toLocaleString()}
                          </bdi>
                        </del>
                        <bdi className="currentPrice ss02">
                          {(price - (price * offPrice) / 100).toLocaleString()}
                        </bdi>
                        <span className="toman">تومان</span>
                      </>
                    ) : (
                      <>
                        <bdi className="currentPrice ss02">
                          {price.toLocaleString()}
                        </bdi>
                        <span className="toman">تومان</span>
                      </>
                    )}
                  </div>
                  <div className="starDetails">
                    <span className="ss02">{rating}</span>
                    <IoIosStar className="star small__star" />
                  </div>
                </div>
              </div>
            </div>
            <div className="companyProduct__hoverBox">
              <div className="companyProduct__iconBox">
                <AiOutlineSearch />
              </div>
            </div>
          </Link>
        </div>
      ) :isLoading? (
        <div className="companyProduct--skeleton">
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Skeleton
              variant="rounded"
              animation="wave"
              height="6rem"
              width="6rem"
            />
            <div className="CompanyProduct__info">
              <Stack spacing={1}>
                <Skeleton animation="wave" height="2rem" width="100%" />
                <Skeleton animation="wave" height="2rem" width="100%" />
              </Stack>
            </div>
          </Stack>
        </div>
      ):null}
    </>
  );
}
