//packages
import { Link } from "react-router-dom";
//icons
import { BsClockHistory } from "react-icons/bs";
//styles
import "./ArticleBox.css";
import { Avatar, Skeleton, Stack } from "@mui/material";

export default function ArticleBox(props) {
  const { status } = props;
  return (
    <>
      {status === "success" ? (
        <div className="articleBox">
          <Link className="articleBox__link" to="/">
            <div className="articleBox__banner">
              <img
                src="/images/article1.webp"
                alt="article banner"
                className="articleBox__img"
              />
            </div>
            <div className="articleBox__title">
              تاثیر هوش مصنوعی بر بازاریابی دیجیتال
            </div>
          </Link>
          <div className="articleBox__details">
            <div className="articleBox__author">
              <img
                className="articleBox__authorImg"
                src="/images/author.jpg"
                alt="author article img"
              />
              <span className="articleBox__authorName">امین بیگ زاده</span>
            </div>
            <div className="articleBox__time">
              <div className="articleBox__iconBox">
                <BsClockHistory className="fullIcon" />
              </div>
              <span className="articleBox__upload">
                23<bdi>دی</bdi>1401
              </span>
            </div>
          </div>
        </div>
      ) : 
      <div className="articleBox">
      <Stack spacing={1}>
            <Skeleton
              animation="wave"
              height="16rem"
              width="100%"
              variant="rounded"
            />
            <Skeleton animation="wave" height="2rem" width="100%" />
            <Stack sx={{display:"flex",flexDirection:"row",alignItems:"center",gap:"1rem"}}>

            <Skeleton variant="circular" animation="wave" height="3rem" width="3rem" />
            <Skeleton animation="wave" height="2rem" width="100%" />
            </Stack>
          </Stack>
      </div>
      }
    </>
  );
}
