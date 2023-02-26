import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Outlet, useFetcher, useLocation, useParams } from "react-router-dom";

import ShowCategory from "../../components/ShowCategory/ShowCategory";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { BiPoll } from "react-icons/bi";
import PriceSlider from "../../components/PriceSlider/PriceSlider";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import Brands from "../../components/Brands/Brands";
import "./ProductsCategory.css";
import ProductsContext from "../../Context/ProductsContext";
import { useContext } from "react";
import ProductCart from "../../components/ProductCart/ProductCart";
import useFetch from "./../../hooks/useFetch";

export default function ProductsCategory({ products, categories }) {
  const productsContext = useContext(ProductsContext);
  const [isShowSortList, setIsShowSortList] = useState(false);
  const [sortBy, setSortBy] = useState("مرتب سازی براساس");
  const { categoryName, subCategory } = useParams();
  const [minPrice, setMinPrice] = useState(parseInt(0));
  const [maxPrice, setMaxPrice] = useState(parseInt(100000));
  const [lowestPrice, setLowestPrice] = useState(parseInt(0));
  const [highestPrice, setHighestPrice] = useState(parseInt(100000));
  const [sortByStatus, setSortByStatus] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [isLoading,setIsloading]=useState(true)

  const sortProductsHandler =() => {
    switch (sortBy) {
      case "مرتب‌ سازی براساس محبوبیت": {
        const popularity =  filteredProducts.sort(
          (a, b) => b.attributes.like - a.attributes.like
        );
        setSortedProducts(popularity);
        setIsShowSortList(false)
        break;
      }
      case "مرتب‌ سازی براساس امتیاز": {
        const score = [...filteredProducts].sort(
          (a, b) => b.attributes.score - a.attributes.score
        );
        setSortedProducts(score);
        setIsShowSortList(false)
        break;
      }
      case "مرتب‌ سازی براساس آخرین": {
        setSortedProducts(filteredProducts);
        setIsShowSortList(false)
        break;
      }
      case "مرتب‌ سازی براساس ارزان ترین": {
        const cheapest = [...filteredProducts].sort(
          (a, b) => a.attributes.price - b.attributes.price
        );
        setSortedProducts(cheapest);
        setIsShowSortList(false)
        break;
      }
      case "مرتب‌ سازی براساس گران ترین": {
        const expensive = [...filteredProducts].sort(
          (a, b) => b.attributes.price - a.attributes.price
        );
        setSortedProducts(expensive);
        setIsShowSortList(false)
        break;
      }
      case "مرتب‌ سازی براساس موجودی": {
        const availabled = filteredProducts.filter(
          (product) => product.attributes.isAvailable
        );
        setSortedProducts(availabled);
        setIsShowSortList(false)
        break;
      }
      case "مرتب‌ سازی براساس پر فروش ترین": {
        const bestselling = [...filteredProducts].sort(
          (a, b) => b.attributes.sale - a.attributes.sale
        );
        setSortedProducts(bestselling);
        setIsShowSortList(false)
        break;
      }

      default:
        {
          setSortedProducts(filteredProducts);
          setIsShowSortList(false)
          break;
        }
        
    }
  };
  const getProductsByCategory = async () => {
    await fetch(
      `http://localhost:1337/api/products?filters[category][shortLink][$eq]=${categoryName}&populate=deep`
    )
      .then((res) => res.json())
      .then((allData) => {
        setFilteredProducts(allData.data);
        setSortedProducts(allData.data);
        setIsloading(false)
        setSortBy("مرتب سازی براساس")
      });
  };
  const getProductsBySubCategory = async () => {
    await fetch(
      `http://localhost:1337/api/products?filters[sub_category][shortLink][$eq]=${subCategory}&populate=deep`
    )
      .then((res) => res.json())
      .then((allData) => {
        setFilteredProducts(allData.data);
        setSortedProducts(allData.data);
        setIsloading(false)
        setSortBy("مرتب سازی براساس")
      });
  };

  useEffect(() => {
    if (categoryName && !subCategory) {
      getProductsByCategory();
    }else{
      getProductsBySubCategory();
    }
  }, [categoryName, subCategory]);

  useEffect(() => {
    sortProductsHandler();
  }, [sortBy]);
console.log("sortedProducts",sortedProducts)
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Breadcrumb />
          </div>
          <ShowCategory
            allCategory={productsContext.categories}
            isLoadingCategories={productsContext.isLoadingCategories}
            categoryName={categoryName}
            subCategory={subCategory}
            setSortByStatus={setSortByStatus}
          />
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
            <CategoryFilter categories={productsContext.categories} />
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
                      {sortBy}
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
                    <li
                      className="productsCategory__sorteItem"
                      onClick={(e) =>setSortBy(e.target.innerHTML)}
                    >
                      مرتب‌ سازی براساس محبوبیت
                    </li>
                    <li
                      className="productsCategory__sorteItem"
                      onClick={(e) =>setSortBy(e.target.innerHTML)}
                    >
                      مرتب‌ سازی براساس امتیاز
                    </li>
                    <li
                      className="productsCategory__sorteItem"
                      onClick={(e) =>setSortBy(e.target.innerHTML)}
                    >
                      مرتب‌ سازی براساس آخرین
                    </li>
                    <li
                      className="productsCategory__sorteItem"
                      onClick={(e) =>setSortBy(e.target.innerHTML)}
                    >
                      مرتب‌ سازی براساس ارزان ترین
                    </li>
                    <li
                      className="productsCategory__sorteItem"
                      onClick={(e) =>setSortBy(e.target.innerHTML)}
                    >
                      مرتب‌ سازی براساس گران ترین
                    </li>
                    <li
                      className="productsCategory__sorteItem"
                      onClick={(e) =>setSortBy(e.target.innerHTML)}
                    >
                      مرتب‌ سازی براساس موجودی
                    </li>
                    <li
                      className="productsCategory__sorteItem"
                      onClick={(e) =>setSortBy(e.target.innerHTML)}
                    >
                      مرتب‌ سازی براساس پر فروش ترین
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="allProduct__category">
              {!productsContext.errorProducts ? (
                <>
                  {!productsContext.isLoadingProducts ? (
                    <>
                      {!isLoading ? (  sortedProducts.length ? sortedProducts.map((product) => (
                          <>
                            <div
                              className="col-12 col-sm-6 col-lg-3"
                              key={product.id}
                            >
                              <ProductCart details={product.attributes} />
                            </div>
                          </>
                        )):
                        <div className="alertError">هیچ محصولی یافت نشد</div>) : <div className="loadingSpiner"></div>
                      
                     
                       }
                    </>
                  ) : (
                    <div className="loadingSpiner"></div>
                  )}
                </>
              ) : (
                <>
                  {/* {console.log("errorProducts", productsContext.errorProducts)} */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
<ProductCart details={product.attributes} />
</div> */
}
