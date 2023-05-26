import { useEffect, useState } from "react";
//packages
import { useParams } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/productsSlice";
import { nanoid } from "@reduxjs/toolkit";
//components
import ShowCategory from "../../components/ShowCategory/ShowCategory";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PriceSlider from "../../components/PriceSlider/PriceSlider";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import Brands from "../../components/Brands/Brands";
import ProductCart from "../../components/ProductCart/ProductCart";
import Error from "../../components/Error/Error";
import CustomPagination from "./../../components/Pagination/CustomPagination";
//icons
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { BiPoll } from "react-icons/bi";
import { FaSortAmountDown } from "react-icons/fa";
import { BsSliders } from "react-icons/bs";
//constants
import { sortedProductsItems } from "../../Constants";
//persian text
import { persianTexts } from "../../text";
//styles
import "./ProductsCategory.css";

export default function ProductsCategory() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.products);
  const { categoryName, subCategory } = useParams();
  const [isShowSortList, setIsShowSortList] = useState(false);
  const [isShowFilterOptions, setIsShowFilterOptions] = useState(false);
  const [sortStatusPersian, setSortStatusPersian] = useState("");

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 12,
    category: categoryName ?? "",
    subCategory: subCategory ?? "",
    price: "",
    color: "",
    sort: "",
  });
  
  useEffect(() => {
    setPageInfo((prev) => ({
      ...prev,
      category: categoryName ?? "",
      subCategory: subCategory ?? "",
    }));
  }, [categoryName, subCategory]);

  useEffect(() => {
    console.log("pageInfo", { ...pageInfo });
    dispatch(
      getProducts({...pageInfo})
    );
  }, [pageInfo]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">{/* <Breadcrumb /> */}</div>
        <ShowCategory categoryName={categoryName} subCategory={subCategory} />
      </div>
      <div className="row">
        <div className="col-lg-3">
          <div
            className={`filtered__options ${
              isShowFilterOptions ? "filtered__options--show" : null
            }`}
          >
            <PriceSlider setPageInfo={setPageInfo} />
            <CategoryFilter category={categoryName} setCategory={setPageInfo} />
            <Brands />
          </div>
        </div>
        <div className="col-lg-9">
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
            {status === "success" &&
              (data.data.length > 0 ? (
                data.data.map((product) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
                    key={product._id}
                  >
                    <ProductCart {...product} status={status} />
                  </div>
                ))
              ) : (
                <Error
                  title={persianTexts.productsCategory.noProducts}
                  type="warning"
                />
              ))}
            {status === "loading" &&
              Array(pageInfo.limit)
                .fill(0)
                .map((product) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
                    key={nanoid}
                  >
                    <ProductCart status={status} />
                  </div>
                ))}
            {error && <Error title="خطا در ارتباط با سرور" type="warning" />}
          </div>

          {/* end show products */}
          {/* start pagination */}
          {data?.lastPage > 1 && (
            <CustomPagination
              count={data.lastPage}
              setData={setPageInfo}
              page={pageInfo.page}
            />
          )}
          {/* end pagination */}
        </div>
      </div>
    </div>
  );
}
