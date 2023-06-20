//packages
import { Skeleton } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
//rtkquery
import { Link } from "react-router-dom";
import { useGetArticlesQuery } from "../../features/article/articleApiSlice";
//styles
import "./LastArticles.css";


const LastArticles = ({ isLoading }) => {
  const {
    data: articles,
    isLoading: articlesLoading,
    isSuccess: articlesSuccess,
  } = useGetArticlesQuery({ page: 1, limit: 5 });
  console.log("articles", articles);
  return (
    <section className="last-articles max__blog">
      {!isLoading ? (
        <>
          <h3 className="last-articles__header markHeader">آخرین مقاله ها</h3>
          <ul className="last-articles__lists">
            {articles?.data?.length &&
              articles.data.map((article) => (
                <li className="last-articles__item" key={article._id}>
                  <Link
                    to={`/article/${article._id}`}
                    className="last-articles__link"
                  >
                    <img
                      src={`http://localhost:8000${article.image}`}
                      alt=""
                      className="last-articles__img"
                    />
                  </Link>
                  <p className="last-articles__title">{article.title}</p>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <div className="last-articles__skeleton">
          <Skeleton
            animation="wave"
            height={10}
            width="50%"
            sx={{ m: "1.2rem 0" }}
          />
          {Array(4)
            .fill(0)
            .map((item) => (
              <div className="flex last-articles__skeleton__mb" key={nanoid()}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  height={50}
                  width={50}
                  sx={{ marginLeft: ".7rem" }}
                />
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  height={50}
                  width="100%"
                />
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default LastArticles;
