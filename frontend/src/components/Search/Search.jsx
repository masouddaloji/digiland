import { useState } from "react";
// packages
import { Link } from "react-router-dom";
//rtk queryuu
import { useGetProductsQuery } from "../../features/Product/ProductApiSlice";

// icons
import { TfiSearch } from "react-icons/tfi";
import { VscClose } from "react-icons/vsc";
//styles
import "./Search.css";

const Search = () => {
  const [showResult, setShowResult] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 5,
    category: "",
    subCategory: "",
    color: "",
    price: "",
    sort: "",
    brand: "",
    search: "",
  });
  const {
    data: result,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery({ ...searchParams });
  const searchHandler = () => setShowResult(true);

  return (
    <div className="serach__wrapper">
      <form className="searchBox" onSubmit={(e) => e.preventDefault()}>
        <TfiSearch className="searchBox__iconSearch" onClick={searchHandler} />

        <input
          type="text"
          className="searchBox__input"
          placeholder="کلید واژه مورد نظر..."
          value={searchParams.search}
          onChange={(e) => {
            setShowResult(true);
            setSearchParams((prev) => ({ ...prev, search: e.target.value }));
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              searchHandler();
            }
          }}
        />

        {showResult && (
          <VscClose
            className="search-box__btn--close"
            onClick={() => setShowResult(false)}
          />
        )}

        {showResult && searchParams.search && (
          <div className="search-box__result-wrapper">
            {isLoading && <div className="search-box__loader"></div>}
            {isSuccess && (
              <>
                {result.data?.length > 0 ? (
                  <>
                    {result.data.map((item) => (
                      <div
                        className="search-box__result-box"
                        key={item._id}
                        onClick={() => setShowResult(false)}
                      >
                        <div className="search-box__result-banner">
                          <img
                            src={`http://localhost:8000${item.image}`}
                            alt="Photo search result"
                            className="search-box__result-img"
                          />
                        </div>
                        <div className="search-box__result-info">
                          <Link
                            className="search-box__result-link"
                            to={`/product/${item._id}`}
                          >
                            {item.title}
                          </Link>
                        </div>
                      </div>
                    ))}
                    <div
                      className="search-box__result-btn"
                      onClick={() => setShowResult(false)}
                    >
                      <Link
                        to={`/products/search/${searchParams.search}`}
                        className="search-box__result-seeAll"
                      >
                        مشاهده همه نتایج
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="search-box__error-box">
                    <span>نتیجه ای یافت نشد</span>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Search;
