//styles
import { useState } from "react";
import WeblogItem from "../../components/WeblogItem/WeblogItem";
import { useGetArticlesQuery } from "../../features/article/articleApiSlice";
import "./WebLog.css";
import { nanoid } from "@reduxjs/toolkit";
import ArticleReview from "../../components/articleReview/articleReview";
import LastArticles from "../../components/LastArticles/LastArticles";


const WebLog = () => {
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
              {isSuccess&& articles?.data?.length &&
                articles.data.map((article) => (
                  <div className="row" key={article._id}>
                    <WeblogItem {...article} isLoading={isLoading} isSuccess={isSuccess}/>
                  </div>
                ))}
                {isLoading && Array(pageInfo.limit)
                .fill(0).map(skeleton=><div className="row" key={nanoid()}>
                    <WeblogItem isLoading={isLoading} />
                  </div>)}
            </div>
            {/* end show artcles */}
          </div>
            {/* start show review artcles */}
          <div className="col-12 col-lg-4 col-xl-3">
                <ArticleReview isLoading={isLoading}/>
                  <LastArticles isLoading={isLoading}/>
          </div>
            {/* end show review artcles */}
        </div>
      </div>
    </section>
  );
};

export default WebLog;
