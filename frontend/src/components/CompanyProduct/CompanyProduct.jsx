//packages
import { Link } from "react-router-dom";
//icons
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosStar } from "react-icons/io";
//styles
import "./CompanyProduct.css";

export default function CompanyProduct(props) {
  const { _id, title, image, price, offPrice, rating } = props;
  return (
    <div className="companyProduct">
      <Link to={`/product/${_id}`} className="companyProduct__link">
        <div className="CompanyProduct__banner">
          <img
            className="CompanyProduct__img"
            src={`http://localhost:8000${image}`}
            alt="CompanyProduct image"
          />
        </div>
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
  );
}
