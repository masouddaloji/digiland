//packages
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
//styles
import "./BannerBox.css";

function BannerBox(props) {
  const { cover, link, isLoading, isSuccess } = props;
  return (
    <>
      {isLoading ? (
        <div className="widget__imageBox">
          <Skeleton
            animation="wave"
            height="38rem"
            width="100%"
            variant="rounded"
          />
        </div>
      ) : isSuccess ? (
        <div className="widget__imageBox">
          <Link className="widget__link" to={link}>
            <img src={cover} alt="banner img" className="widget__img" />
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default BannerBox;
