import { useEffect, useState } from "react";
//packages
import { useParams } from "react-router-dom";
//components
import ShowCategory from "../../components/ShowCategory/ShowCategory";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PriceSlider from "../../components/PriceSlider/PriceSlider";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import Brands from "../../components/Brands/Brands";
import ProductCart from "../../components/ProductCart/ProductCart";
import Error from "../../components/Error/Error";
import axios from "../../api/axios";
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
  const { categoryName, subCategory } = useParams();
  const [isShowSortList, setIsShowSortList] = useState(false);
  const [isShowFilterOptions, setIsShowFilterOptions] = useState(false);
  const [sortBy, setSortBy] = useState({
    category: categoryName ? categoryName : "",
    tags: subCategory ? subCategory : "",
    price: "",
    color: "",
    sort: "",
  });
  const [sortStatusPersian, setSortStatusPersian] = useState("");

  const [pageInfo, setPageInfo] = useState({
    isLoading: false,
    data: [],
    page: 1,
    pageSize: 12,
    isShowPagination: false,
    pageCount: null,
    maxPrice: null,
  });
  const getProductsBy = async () => {
    setPageInfo((prev) => ({ ...prev, isLoading: true }));
    await axios
      .get(`products`, {
        params: {
          page: pageInfo.page,
          limit: pageInfo.pageSize,
          category: sortBy.category,
          color: sortBy.color,
          tags: sortBy.tags,
          sort: sortBy.sort,
          price: sortBy.price,
        },
      })
      .then((res) => {
        const prices = res?.data?.data?.map((product) => product.price);
        const maxPriceinProduct = Math.max(...prices);
        setPageInfo((prev) => ({
          ...prev,
          isLoading: false,
          data: res.data?.data ?? [],
          isShowPagination: res.data?.hasNextPage,
          pageCount: res.data?.lastPage ?? null,
          maxPrice: maxPriceinProduct,
        }));

        console.log(res);
      });
  };
  useEffect(() => {
    if (subCategory) {
      return setSortBy((prev) => ({
        ...prev,
        category: categoryName,
        tags: subCategory,
      }));
    }
    return setSortBy((prev) => ({ ...prev, category: categoryName }));
  }, [categoryName, subCategory]);
  useEffect(() => {
    getProductsBy();
  }, [sortBy, pageInfo.page, pageInfo.pageSize]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">{/* <Breadcrumb /> */}</div>
        <ShowCategory categoryName={categoryName} subCategory={subCategory} />
      </div>
      <div className="row">
       <div className="col-lg-3">
       <div className={`filtered__options ${isShowFilterOptions?"filtered__options--show":null}`}>
          <PriceSlider setSortBy={setSortBy} max={pageInfo.maxPrice} />
          <CategoryFilter category={categoryName} setCategory={setSortBy} />
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
                <FaSortAmountDown className="sort__icon"/>
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
                        setSortBy((prev) => ({
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
              <span onClick={()=>setIsShowFilterOptions(!isShowFilterOptions)}> 
              <BsSliders className="filter__icon" />
              فیلتر
              </span>
            </div>
          </div>
          {/* end sorted products */}
          {/* start show products */}
          <div className="row row_reverce">
            {!pageInfo.isLoading ? (
              pageInfo.data.length > 0 ? (
                pageInfo.data.map((product) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
                    key={product._id}
                  >
                    <ProductCart {...product} />
                  </div>
                ))
              ) : (
                <Error
                  title={persianTexts.productsCategory.noProducts}
                  type="warning"
                />
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>

          {/* end show products */}
          {/* start pagination */}
          {!pageInfo.isLoading && (
            <CustomPagination
              count={pageInfo.pageCount}
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
