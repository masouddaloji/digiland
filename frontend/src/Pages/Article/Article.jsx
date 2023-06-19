//packages
import { Link, useParams } from "react-router-dom";
import domPurify from "dompurify";
import { useSelector } from "react-redux";
//rtk query
import { useGetArticleByIdQuery } from "../../features/article/articleApiSlice";
//hooks
import useConvertDate from "../../hooks/useConvertDate";
//components
import Loader from "../../components/Loader/Loader";
//icons
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FiFolder } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { BiCommentDetail } from "react-icons/bi";
//styles
import "./Article.css";
import Rating from "../../components/Rating/Rating";

const Article = () => {
  const { token } = useSelector((state) => state.auth);
  const { articleId } = useParams();
  const {
    data: articleInfo,
    isLoading,
    isSuccess,
  } = useGetArticleByIdQuery(articleId);
  console.log("articleInfo", articleInfo);
  return (
    <section className="article">
      <div className="container">
        {isLoading && <Loader />}
        {isSuccess && (
          <>
            <div className="row">
              <div className="article__header">
                <h2 className="article__title">{articleInfo.title}</h2>
                <div className="article__imgBox">
                  <img
                    src={`http://localhost:8000${articleInfo.image}`}
                    alt=""
                    className="article__img"
                  />
                </div>
                <div className="article__infoBox">
                  <div className="article__infoItem">
                    <MdOutlineDateRange className="articleInfo__icon" />
                    <span>تاریخ انتشار :</span>
                    <span>{useConvertDate(articleInfo.createdAt)}</span>
                  </div>
                  <div className="article__infoItem">
                    <FaRegUser className="articleInfo__icon" />
                    <span>نویسنده :</span>
                    <span>{articleInfo.writer}</span>
                  </div>
                  <div className="article__infoItem">
                    <FiFolder className="articleInfo__icon" />
                    <span>دسته بندی :</span>
                    <span>{articleInfo.category}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="article__content"
                dangerouslySetInnerHTML={{
                  __html: domPurify.sanitize(articleInfo.description),
                }}
              ></div>
            </div>
            <div className="row">
              <div className="article__review">
                <div className="article__review-header">
                  <span className="article__review-title">
                    <GoCommentDiscussion className="article__review-icon" />
                    دیدگاه کاربران
                  </span>
                  <span className="article__review-count ss02">
                    <span>{articleInfo?.reviews?.length??null}</span>
                    دیدگاه
                  </span>
                </div>
                {/* start review item */}
                {articleInfo?.reviews?.length &&
                  articleInfo.reviews.map((review) => (
                    <div className="review__item" key={review._id}>
                      <p className="review__item__details">
                        <span>{review.userId.email.split("@")[0]}</span>
                        <span>{useConvertDate(review.createdAt)}</span>
                      </p>
                      <p className="review__item__content">
                        {review.description}
                      </p>
                    </div>
                  ))}

                {/* end review item */}

                {/* start send review */}
                <div className="article__review-header">
                  <span className="article__review-title">
                    <BiCommentDetail className="article__review-icon" />
                    ارسال دیدگاه
                  </span>
                </div>
                {/* start review item */}
                {!token ? (
                  <Link
                    to="/login"
                    className="review__item__content review__not-login"
                  >
                    برای نوشتن دیدگاه باید وارد بشوید.
                  </Link>
                ) : (
                  <Rating typeRating="article" id={articleId} />
                )}
                {/* end send review */}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Article;
