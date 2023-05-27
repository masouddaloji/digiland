import { useEffect, useRef, useState } from "react";
// packages
import { Link } from "react-router-dom";
//constants
import { menus } from "../../Constants";
// icons
import { TfiSearch } from "react-icons/tfi";
import { TbApps } from "react-icons/tb";
//styles
import "./Search.css";
const Search = () => {
  const searchRef = useRef();
  const [showCategory, setShowCategory] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [showLoader, setShowLoader] = useState(false);
  const [seeSearchResult, setSeeSearchResult] = useState(false);
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
        <Link className="searchBox__btn" to="/">
          <TfiSearch className="searchBox__iconSearch" />
        </Link>
        <input
          type="text"
          className="searchBox__input"
          placeholder="کلید واژه مورد نظر..."
        />

        {showResult && (
          <VscClose
            className="search-box__btn--close"
            onClick={() => setShowResult(false)}
          />
        )}

        {showResult && (
          <div className="search-box__result-wrapper">
            {showLoader && <div className="search-box__loader"></div>}
            {seeSearchResult ? (
              <>
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
                </div>
              </>
            ) : (
              <div className="search-box__error-box">
                <span>نتیجه ای یافت نشد</span>
              </div>
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
      <div
        className={`category ${showCategory ? "category--show" : ""}`}

      >
        <ul className="category__lists">
          <li
            className={`category__item ${
              currentCategory === "all" && "category--current"
            }`}
            onClick={(e) => {
              setCurrentCategory("all");
              setShowCategory(false);
            }}
          >
            تمام دسته ها
          </li>
          {menus.map((category) => (
            <li
              key={category.shortLink}
              className={`category__item ${
                currentCategory === category.shortLink && "category--current"
              }`}
              onClick={() => {
                setCurrentCategory(category.shortLink);
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
