import {  useEffect, useRef, useState } from "react";
//packages
import { useParams } from "react-router-dom";
//components
import Brands from "../Brands/Brands";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import ColorFilter from "../ColorFilter/ColorFilter";
import PriceSlider from "../PriceSlider/PriceSlider";
import SidebarFilterItem from "./SidebarFilterItem";
//icons
import { IoClose } from "react-icons/io5";
//styles
import "./SidebarFilter.css";

const SidebarFilter = ({
  pageInfo,
  setPageInfo,
  isShowFilterOptions,
  setIsShowFilterOptions,
}) => {
  const { categoryName, subCategory } = useParams();
  const maskRef = useRef();
  const [width, setWidth] = useState(window.innerWidth);

  const closeFilterMask = (e) => {
    if (maskRef.current === e.target) {
      setIsShowFilterOptions(false);
    }
  }

  const restFilterHandler = () => {
    setPageInfo((prev) => ({
      ...prev,
      price: "",
      brand: "",
      color: "",
    }));
  }

  const resizeHandler = () => {
    setWidth(window.innerWidth);
  }
  
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [window.innerWidth]);
  return (
    <>
      {/* mask for filterMobile */}
      <div className={`${width >= 992 && "col-lg-4 col-xl-3"} `}>
        {width < 992 && (
          <div
            className={`filterMobile__mask ${
              isShowFilterOptions && "filterMobile__mask--show"
            }`}
            ref={maskRef}
            onClick={closeFilterMask}
          ></div>
        )}
        <div
          className={` ${
            width >= 992
              ? "filter"
              : `filterMobile ${isShowFilterOptions && "filterMobile--show"}`
          } `}
        >
          <div className="filter__header">
            <h4 className="filter__headerTitle">
              فیلترها
              {pageInfo.price || pageInfo.brand || pageInfo.color ? (
                <p
                  className="filter__deleteFilters"
                  onClick={restFilterHandler}
                >
                  حذف فیلترها
                </p>
              ) : null}
            </h4>

            {width < 992 && (
              <IoClose
                className="filter--closeBtn"
                onClick={() => setIsShowFilterOptions(false)}
              />
            )}
          </div>

          <SidebarFilterItem
            header=" محدوده قیمت :"
            highLight={pageInfo.price}
            isPrice={true}
          >
            <PriceSlider setPageInfo={setPageInfo} pageInfo={pageInfo} />
          </SidebarFilterItem>

          <SidebarFilterItem header=" دسته بندی محصولات :">
            <CategoryFilter category={categoryName} setCategory={setPageInfo} />
          </SidebarFilterItem>

          <SidebarFilterItem header=" برند ها :" highLight={pageInfo.brand}>
            <Brands
              setFilter={setPageInfo}
              filterInfo={pageInfo}
              categoryName={categoryName}
              subCategory={subCategory}
            />
          </SidebarFilterItem>

          <SidebarFilterItem header=" رنگ ها :" highLight={pageInfo.color}>
            <ColorFilter setFilter={setPageInfo} filterInfo={pageInfo} />
          </SidebarFilterItem>
        </div>
      </div>
    </>
  );
};

export default SidebarFilter;
