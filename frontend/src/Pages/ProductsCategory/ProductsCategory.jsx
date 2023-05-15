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
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
//constants
import { sortedProductsItems } from "../../Constants";
//persian text
import { persianTexts } from "../../text";
//styles
import "./ProductsCategory.css";

export default function ProductsCategory() {
  const { categoryName, subCategory } = useParams();
  const [isShowSortList, setIsShowSortList] = useState(false);
  const [sortBy, setSortBy] = useState({
    category: categoryName ? categoryName : "",
    tags: subCategory ? subCategory : "",
    price: "",
    color: "",
    sort: "",
  });
  const [sortStatusPersian, setSortStatusPersian] = useState("");

  const [minPrice, setMinPrice] = useState(parseInt(0));
  const [maxPrice, setMaxPrice] = useState(parseInt(100000));
  const [lowestPrice, setLowestPrice] = useState(parseInt(0));
  const [highestPrice, setHighestPrice] = useState(parseInt(100000));

  const [pageInfo, setPageInfo] = useState({
    isLoading: false,
    data: [],
    page: 1,
    pageSize: 12,
    isShowPagination: false,
    pageCount: null,
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
        },
      })
      .then((res) => {
        setPageInfo((prev) => ({
          ...prev,
          isLoading: false,
          data: res.data?.data??[],
          isShowPagination: res.data?.hasNextPage,
          pageCount: res.data?.lastPage??null,
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
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">{/* <Breadcrumb /> */}</div>
          <ShowCategory categoryName={categoryName} subCategory={subCategory} />
        </div>
        <div className="row">
          <div className="col-lg-3">
            <PriceSlider
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              lowestPrice={lowestPrice}
              highestPrice={highestPrice}
            />
            {/* <CategoryFilter category={categoryName} setCategory={setSortBy} /> */}
            <Brands />
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
              <p className="productsCategory__countResult">
                نمایش دادن همه{" "}
                <span className="productsCategory__counterResult">20</span>{" "}
                نتیجه
              </p>
              <div className="productsCategory__sortedBox">
                <div className="productsCategory__sortWrapper">
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
                      <AiOutlinePlusCircle className="productsCategory__icon" />
                    ) : (
                      <AiOutlineCloseCircle className="productsCategory__icon iconRed" />
                    )}
                  </div>
                  <ul
                    className={`productsCategory__sorteLists ${
                      isShowSortList
                        ? "productsCategory__sorteLists--show"
                        : null
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
              </div>
            </div>
            {/* end sorted products */}
            {/* start show products */}
            <div className="row row_reverce">
              {!pageInfo.isLoading ? (
                pageInfo.data.length > 0 ? (
                  pageInfo.data.map((product) => (
                    <div
                      className="col col-sm-2 col-md-4 col-lg-3"
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
    </>
  );
}
