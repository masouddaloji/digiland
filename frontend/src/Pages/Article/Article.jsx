//packages
import { Link, useParams } from "react-router-dom";
import domPurify from "dompurify";
import { useSelector } from "react-redux";
//rtk query
import { useGetArticleByIdQuery } from "../../features/article/articleApiSlice";
//hooks
import useConvertDate from "../../hooks/useConvertDate";
import useTitle from "../../hooks/useTitle";
//components
import Loader from "../../components/Loader/Loader";
import Rating from "../../components/Rating/Rating";
import Error from "../../components/Error/Error";
import Slider from "../../components/Slider/Slider";
//icons
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FiFolder } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
//styles
import "./Article.css";

const Article = () => {
  const { token } = useSelector((state) => state.auth);
  const { articleId } = useParams();
  const {
    data: articleInfo,
    isSuccess,
  } = useGetArticleByIdQuery(articleId);
  useTitle(articleInfo?.data?.title)
  return (
    <section className="article">
      <div className="container">
        {isSuccess && (
          <>
            <div className="row">
              <div className="article__header">
                <h2 className="article__title">{articleInfo?.data?.title}</h2>
                <div className="article__imgBox">
                  <img
                    src={`http://localhost:8000${articleInfo?.data?.image}`}
                    alt=""
                    className="article__img"
                  />
                </div>
                <div className="article__infoBox">
                  <div className="article__infoItem">
                    <MdOutlineDateRange className="articleInfo?.data?__icon" />
                    <span>تاریخ انتشار :</span>
                    <span>{useConvertDate(articleInfo?.data?.createdAt)}</span>
                  </div>
                  <div className="article__infoItem">
                    <FaRegUser className="articleInfo?.data?__icon" />
                    <span>نویسنده :</span>
                    <span>{articleInfo?.data?.writer}</span>
                  </div>
                  <div className="article__infoItem">
                    <FiFolder className="articleInfo?.data?__icon" />
                    <span>دسته بندی :</span>
                    <span>{articleInfo?.data?.category}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="article__content ss02"
                dangerouslySetInnerHTML={{
                  __html: domPurify.sanitize(articleInfo?.data?.description),
                }}
              ></div>
            </div>

            {/* start related article */}
                <div className="article__related-wrapper">
                <div className="row">
       <div className="article__review">
       <div className="article__review-header">
                  <span className="article__review-title">
                    <AiOutlineRetweet className="article__review-icon" />
                   مقالات مرتبط
                  </span>
                  </div>

                  {articleInfo?.related?.length && (
              <Slider
                isLoading={false}
                isSuccess={isSuccess}
                slidesPerView={3}
                spaceBetween={15}
                autoplay={true}
                loop={true}
                array={articleInfo?.related}
                slide="ArticleBox"
              />
            )}
                  </div>
</div>
                </div>
            {/* end related article */}

            <div className="row">
              <div className="article__review">
                <div className="article__review-header">
                  <span className="article__review-title">
                    <GoCommentDiscussion className="article__review-icon" />
                    دیدگاه کاربران
                  </span>
                  <span className="article__review-count ss02">
                    <span>
                      {articleInfo?.data?.reviews?.length > 0 &&
                        articleInfo.data.reviews.length}
                    </span>
                    دیدگاه
                  </span>
                </div>

                {/* start review item */}
                {articleInfo?.data?.reviews?.length
                  ? articleInfo?.data?.reviews.map((review) => (
                      <div className="review__item" key={review._id}>
                        <p className="review__item__details">
                          <span>{review.userId.email.split("@")[0]}</span>
                          <span>{useConvertDate(review.createdAt)}</span>
                        </p>
                        <p className="review__item__content">
                          {review.description}
                        </p>
                      </div>
                    ))
                  : <Error title="نظری یافت نشد" type="warning" />}

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
