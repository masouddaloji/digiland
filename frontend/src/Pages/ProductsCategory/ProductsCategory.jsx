import { useEffect, useRef, useState } from "react";
//packages
import { useParams } from "react-router-dom";
//redux
import { nanoid } from "@reduxjs/toolkit";
//rtk query
import { useGetProductsQuery } from "../../features/Product/ProductApiSlice";
//components
import ShowCategory from "../../components/ShowCategory/ShowCategory";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PriceSlider from "../../components/PriceSlider/PriceSlider";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import Brands from "../../components/Brands/Brands";
import ProductCart from "../../components/ProductCart/ProductCart";
import Error from "../../components/Error/Error";
import CustomPagination from "./../../components/Pagination/CustomPagination";
import ColorFilter from "../../components/ColorFilter/ColorFilter";
//icons
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { BiPoll } from "react-icons/bi";
import { FaSortAmountDown } from "react-icons/fa";
import { BsSliders } from "react-icons/bs";
//constants
import { sortedProductsItems } from "../../Constants";
//persian text
import { persianTexts } from "../../text";
//styles
import "./ProductsCategory.css";
import SidebarFilter from "../../components/SidebarFilter/SidebarFilter";

export default function ProductsCategory() {
  const { categoryName, subCategory, searchParam } = useParams();
  const maskRef = useRef();
  const [isShowSortList, setIsShowSortList] = useState(false);
  const [isShowFilterOptions, setIsShowFilterOptions] = useState(false);
  const [sortStatusPersian, setSortStatusPersian] = useState("");

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 12,
    category: categoryName ?? "",
    subCategory: subCategory ?? "",
    color: "",
    price: "",
    sort: "",
    brand: "",
    search: searchParam ?? "",
  });
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery({ ...pageInfo });
  const closeFilterMask = (e) => {
    if (maskRef.current === e.target) {
      setIsShowFilterOptions(false);
    }
  };
  useEffect(() => {
    setPageInfo((prev) => ({
      ...prev,
      category: categoryName ?? "",
      subCategory: subCategory ?? "",
    }));
  }, [categoryName, subCategory]);

  return (
    <div className="container">
      {/* start filter mobile  */}
      <div
        className={`filterMobile__mask ${
          isShowFilterOptions ? "filterMobile__mask--show" : null
        }`}
        ref={maskRef}
        onClick={closeFilterMask}
      ></div>
      <div
        className={`filterMobile ${
          isShowFilterOptions ? "filterMobile--show" : null
        }`}
      >
        <div className="filterMobile__header">
          <span>فیلتر</span>
          <IoMdClose
            className="filterMobile__closeIcon"
            onClick={() => setIsShowFilterOptions(false)}
          />
        </div>
      </div>
      {/* end filter mobile */}
      <div className="row">
        <div className="col-12">{/* <Breadcrumb /> */}</div>
        <ShowCategory categoryName={categoryName} subCategory={subCategory} />
      </div>
      <div className="row">
        <div className="col-lg-3 lg--none">
          <SidebarFilter setPageInfo={setPageInfo} />
        </div>
        <div className="col-12 col-lg-9">
          <div className="pageTitle">
            <div className="pageTitle__box">
              <div className="pageTitle__rightBox">
                <BiPoll className="pageTitle__icon" />
              </div>

              <hr className="pageTitle__divider" />
            </div>
          </div>
          {/* start sorted products */}
          <div>
            <div className="productsCategory__sortedBox">
              <div className="productsCategory__sortWrapper">
                <FaSortAmountDown className="sort__icon" />
                <div
                  className="productsCategory__showedBox"
                  onClick={() => setIsShowSortList(!isShowSortList)}
                >
                  <span className="productsCategory__title">
                    {sortStatusPersian
                      ? sortStatusPersian
                      : "مرتب سازی بر اساس"}
                  </span>
                  {!isShowSortList ? (
                    <HiChevronDown className="productsCategory__icon" />
                  ) : (
                    <HiChevronUp className="productsCategory__icon iconRed" />
                  )}
                </div>
                <ul
                  className={`productsCategory__sorteLists ${
                    isShowSortList ? "productsCategory__sorteLists--show" : null
                  }`}
                >
                  {sortedProductsItems?.map((item) => (
                    <li
                      key={item.id}
                      className="productsCategory__sorteItem"
                      onClick={() => {
                        setPageInfo((prev) => ({
                          ...prev,
                          sort: item.sortedBy,
                        }));
                        setIsShowSortList(false);
                        setSortStatusPersian(item.title);
                      }}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
              <span
                className="filterMobile__btn"
                onClick={() => setIsShowFilterOptions(!isShowFilterOptions)}
              >
                <BsSliders className="filter__icon" />
                فیلتر
              </span>
            </div>
          </div>
          {/* end sorted products */}
          {/* start show products */}

          <div className="row row_reverce">
            {isSuccess &&
              (products?.data?.length > 0 ? (
                products.data.map((product) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
                    key={product._id}
                  >
                    <ProductCart
                      {...product}
                      isLoading={isLoading}
                      isSuccess={isSuccess}
                    />
                  </div>
                ))
              ) : (
                <Error
                  title={persianTexts.productsCategory.noProducts}
                  type="warning"
                />
              ))}
            {isLoading &&
              Array(pageInfo.limit)
                .fill(0)
                .map((product) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
                    key={nanoid}
                  >
                    <ProductCart isLoading={isLoading} isSuccess={isSuccess} />
                  </div>
                ))}
            {isError && (
              <Error
                title={persianTexts.productsCategory.noResponse}
                type="warning"
              />
            )}
          </div>

          {/* end show products */}
          {/* start pagination */}
          {products?.lastPage > 1 && (
            <CustomPagination
              count={products.lastPage}
              setData={setPageInfo}
              page={products.page}
            />
          )}
          {/* end pagination */}
        </div>
      </div>
    </div>
  );
}
