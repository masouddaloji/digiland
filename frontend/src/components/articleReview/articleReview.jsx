//packages
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
//rtk query
import { useGetArticleReviewsQuery } from "../../features/article/articleApiSlice";
//icons
import { BsChatDots } from "react-icons/bs";
//styles
import "./articleReview.css";

const ArticleReview = ({ isLoading }) => {
  const {
    data: reviews,
    isLoading: reviewsLoading,
    isSuccess: reviewsSuccess,
  } = useGetArticleReviewsQuery();
  return (
    <section className="article-review max__blog">
      {!isLoading ? (
        <>
          <h3 className="article-review__header markHeader">دیدگاه ها</h3>
          <ul className="article-review__list">
            {reviews?.length &&
              reviews.map((review) => (
                <li className="article-review__item" key={review._id}>
                  <span>
                    <BsChatDots className="article-review__icon" />
                    {review.userId.email.split("@")[0]}
                  </span>
                  <Link to={`/article/${review.articleId._id}`}>
                    {review.articleId.title}
                  </Link>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <div className="review__skeleton">
          <Skeleton
            animation="wave"
            height={10}
            width="50%"
            sx={{ m: "1.2rem 0" }}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            height={50}
            sx={{ mb: ".7rem" }}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            height={50}
            sx={{ mb: ".7rem" }}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            height={50}
            sx={{ mb: ".7rem" }}
          />
        </div>
      )}
    </section>
  );
};

export default ArticleReview;
