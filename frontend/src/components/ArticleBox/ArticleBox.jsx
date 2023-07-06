//packages
import { Link } from "react-router-dom";
import { Skeleton, Stack, Tooltip } from "@mui/material";
//hooks
import useConvertDate from "../../hooks/useConvertDate";
//icons
import { BsClockHistory } from "react-icons/bs";
//utils
import { addImageFallback } from "../../utils/utils";
//styles
import "./ArticleBox.css";

export default function ArticleBox(props) {
  const { isLoading, isSuccess,title,image,writer,createdAt,_id } = props;
  return (
    <>
      {isSuccess ? (
        <div className="articleBox">
          <Link className="articleBox__link" to={`/article/${_id}`}>
            <div className="articleBox__banner">
              <img
                src={`https://digiland-app.iran.liara.run${image}`}
                alt="article banner"
                className="articleBox__img"
                onError={addImageFallback}
              />
            </div>
            <Tooltip arrow title={title} classes={{ tooltip: "custom__tooltip" }}>
            <div className="articleBox__title">
              {title}
            </div>
            </Tooltip>
          </Link>
          <div className="articleBox__details">
            <div className="articleBox__author">
              <img
                className="articleBox__authorImg"
                src="/images/author.jpg"
                alt="author article img"
              />
              <span className="articleBox__authorName">{writer}</span>
            </div>
            <div className="articleBox__time">
              <div className="articleBox__iconBox">
                <BsClockHistory className="fullIcon" />
              </div>
              <span className="articleBox__upload">
              {useConvertDate(createdAt)}
              </span>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <div className="articleBox">
          <Stack spacing={1}>
            <Skeleton
              animation="wave"
              height="16rem"
              width="100%"
              variant="rounded"
            />
            <Skeleton animation="wave" height="2rem" width="100%" />
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Skeleton
                variant="circular"
                animation="wave"
                height="3rem"
                width="3rem"
              />
              <Skeleton animation="wave" height="2rem" width="100%" />
            </Stack>
          </Stack>
        </div>
      ) : null}
    </>
  );
}
