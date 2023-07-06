//packages
import { Skeleton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import dompurify from "dompurify";
//hooks
import useConvertDate from "../../hooks/useConvertDate";
//icons
import { FaBlog, FaRegUser } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { HiOutlineLink } from "react-icons/hi";
//styles
import "./WeblogItem.css";

const WeblogItem = (props) => {
  const {
    isLoading,
    isSuccess,
    title,
    image,
    _id,
    writer,
    createdAt,
    reviews,
    description,
  } = props;

  return (
    <>
      {isLoading && (
        <div className="weblog__skeleton">
          <Skeleton animation="wave" height={10} />
          <div className="weblog__skeleton-content">
            <div className="col-12 col-md-4">
              <Skeleton animation="wave" height={90} variant="rounded" />
            </div>
            <div className="col-12 col-md-8">
              <Skeleton animation="wave" height={10} sx={{ m: "1rem 0" }} />
              <Skeleton animation="wave" height={10} />
              <Skeleton animation="wave" height={10} sx={{ m: "1rem 0" }} />
            </div>
          </div>
          <Skeleton animation="wave" height={10} />
        </div>
      )}
      {isSuccess && (
        <div className="weblog-item ss02">
          <div className="weblog-item__header">
            <div className="flex">
              <FaBlog className="weblog-item__icon" />
              <h2>{title}</h2>
            </div>

            <span>
              <span>{reviews.length ?? null}</span>
              دیدگاه
            </span>
          </div>
          <div className="weblog-item__content">
            <div className="col-12 col-sm-4">
              <div className="weblog-item__img-box">
                <img
                  src={`https://digiland-app.iran.liara.run${image}`}
                  alt=""
                  className="weblog-item__img"
                />
              </div>
            </div>
            <div className="col-12 col-sm-8">
              <p
                className="weblog-item__text"
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(
                    description.match(/<p>(.*?)<\/p>/)[0]
                  ),
                }}
              ></p>
            </div>
          </div>
          <div className="weblog-item__footer">
            <div className="weblog-item__footer-infos">
              <span>
                <FaRegUser className="weblog-item__footer-icon" />
                {writer}
              </span>
              <span>
                <BsClock className="weblog-item__footer-icon" />
                {useConvertDate(createdAt)}
              </span>
            </div>

            <Tooltip
              title="ادامه ... "
              arrow
              placement="top"
              classes={{ tooltip: "custom__tooltip" }}
            >
              <Link to={`/article/${_id}`} className="weblog-item__link">
                <HiOutlineLink className="weblog-item__footer-link" />
              </Link>
            </Tooltip>
          </div>
        </div>
      )}
    </>
  );
};

export default WeblogItem;
