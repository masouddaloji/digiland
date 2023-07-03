//packages
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
//icons
import { HiChevronLeft } from "react-icons/hi";
//styles
import "./SectionHeader.css";

export default function SectionHeader({
  title,
  link,
  icon,
  btnLink,
  bg,
  isLoading,
}) {
  return (
    <>
      {isLoading ? (
        <Skeleton animation="wave" height="4rem" width="100%" />
      ) : (
        <div className="headerTitleBox">
          <div
            className="rightBox"
            style={{ backgroundColor: bg ? bg : "unset" }}
          >
            {icon}
            <Link className="headerTitle__link" to="/">
              {title}
            </Link>
          </div>
          {btnLink && (
            <div
              className="leftBox"
              style={{ backgroundColor: bg ? bg : "unset" }}
            >
              <Link to={link} className="headerTitle__btn">
                <div className="headerTitle__btnWrapper">
                  <HiChevronLeft className="fullIcon section__btn" />
                </div>
                مشاهده همه
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
