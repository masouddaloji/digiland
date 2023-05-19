//packages
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
//styles
import "./BannerBox.css";

function BannerBox(props) {
  const { cover, link, status } = props;
  return (
    <>
      {status === "loading" ? (
        <div className="widget__imageBox">
        <Skeleton
          animation="wave"
          height="38rem"
          width="100%"
          variant="rounded"
        />
        </div>
      ) : (
        <div className="widget__imageBox">
          <Link className="widget__link" to={link}>
            <img src={cover} alt="banner img" className="widget__img" />
          </Link>
        </div>
      )}
    </>
  );
}

export default BannerBox;
