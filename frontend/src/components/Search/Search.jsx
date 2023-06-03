import { useEffect, useRef, useState } from "react";
// packages
import { Link } from "react-router-dom";
//rtk queryuu
import { useGetProductsQuery } from "../../features/Product/ProductApiSlice";
//constants
import { menus } from "../../Constants";
// icons
import { TfiSearch } from "react-icons/tfi";
import { TbApps } from "react-icons/tb";
import { VscClose } from "react-icons/vsc";
//styles
import "./Search.css";
const Search = () => {
  const searchRef = useRef();
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
  console.log("result",result);
  const searchHandler = () => setShowResult(true);

  const [showCategory, setShowCategory] = useState(false);

  // close filter category
  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (!searchRef?.current?.contains(e.target)) {
        setShowCategory(false);
      }
    };
    document.body.addEventListener("click", outsideClickHandler);
    return () => {
      document.body.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  return (
    <div className="serach__wrapper" ref={searchRef}>
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
                    <div className="search-box__result-btn">
                      <Link to="/products/" className="search-box__result-seeAll">
                        مشاهده همه نتایج
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="search-box__error-box">
                    <span>نتیجه ای یافت نشد</span>
                  </div>
                )}

                {/* <div className="search-box__result-box">
                  <div className="search-box__result-banner">
                    <img
                      src="/images/search-result.png"
                      alt="Photo search result"
                      className="search-box__result-img"
                    />
                  </div>
                  <div className="search-box__result-info">
                    <Link className="search-box__result-link" to="/">
                      گوشی موبايل سامسونگ مدل Galaxy S8 Plus SM-G955FD دو سيم
                      کارت
                    </Link>
                  </div>
                </div>
                <div className="search-box__result-box">
                  <div className="search-box__result-banner">
                    <img
                      src="/images/search-result.png"
                      alt="Photo search result"
                      className="search-box__result-img"
                    />
                  </div>
                  <div className="search-box__result-info">
                    <Link className="search-box__result-link" to="/">
                      گوشی موبايل سامسونگ مدل Galaxy S8 Plus SM-G955FD دو سيم
                      کارت
                    </Link>
                  </div>
                </div>
                <div className="search-box__result-btn">
                  <Link to="/" className="search-box__result-seeAll">
                    مشاهده همه نتایج
                  </Link>
                </div> */}
              </>
            )}
          </div>
        )}
      </form>
      <div className="searchBox__categoryBox">
        <TbApps
          className="searchBox__categoryIcon"
          onClick={() => setShowCategory(!showCategory)}
        />
      </div>
      <div className={`category ${showCategory ? "category--show" : ""}`}>
        <ul className="category__lists">
          <li
            className={`category__item ${
              searchParams.category === "" ? "category--current" : null
            }`}
            onClick={(e) => {
              setSearchParams((prev) => ({ ...prev, category: "" }));
              setShowCategory(false);
            }}
          >
            تمام دسته ها
          </li>
          {menus.map((category) => (
            <li
              key={category.id}
              className={`category__item ${
                searchParams.category === category.shortLink
                  ? "category--current"
                  : null
              }`}
              onClick={() => {
                setSearchParams((prev) => ({
                  ...prev,
                  category: category.shortLink,
                }));
                setShowCategory(false);
              }}
            >
              {category.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
