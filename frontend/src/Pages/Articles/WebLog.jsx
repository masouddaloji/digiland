import { useState } from "react";
//packages
import { nanoid } from "@reduxjs/toolkit";
//rtk query
import { useGetArticlesQuery } from "../../features/article/articleApiSlice";
//components
import ArticleReview from "../../components/articleReview/articleReview";
import WeblogItem from "../../components/WeblogItem/WeblogItem";
import LastArticles from "../../components/LastArticles/LastArticles";
import Error from "../../components/Error/Error";
//hooks
import useTitle from "../../hooks/useTitle";
//persian text
import { persianTexts } from "../../text";
//styles
import "./WebLog.css";

const WebLog = () => {
  useTitle("مقالات")
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
  });
  const {
    data: articles,
    isLoading,
    isSuccess,
  } = useGetArticlesQuery({ page: pageInfo.page, limit: pageInfo.limit });
  return (
    <section className="weblog">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 col-xl-9">
            <div className="weblog__header max__blog">
              <h2 className="weblog__title">وبلاگ</h2>
            </div>
            {/* start show artcles */}
            <div className="weblog__content max__blog">
              {isSuccess && articles?.data?.length ? (
                articles.data.map((article) => (
                  <div className="row" key={article._id}>
                    <WeblogItem
                      {...article}
                      isLoading={isLoading}
                      isSuccess={isSuccess}
                    />
                  </div>
                ))
              ) : (
                <Error
                  type="warning"
                  title={persianTexts.adminArticle.notFoundArticle}
                />
              )}
              {isLoading &&
                Array(pageInfo.limit)
                  .fill(0)
                  .map((skeleton) => (
                    <div className="row" key={nanoid()}>
                      <WeblogItem isLoading={isLoading} />
                    </div>
                  ))}
            </div>
            {/* end show artcles */}
          </div>
          {/* start show review artcles */}
          <div className="col-12 col-lg-4 col-xl-3">
            <ArticleReview isLoading={isLoading} />
            <LastArticles isLoading={isLoading} />
          </div>
          {/* end show review artcles */}
        </div>
      </div>
    </section>
  );
};

export default WebLog;
