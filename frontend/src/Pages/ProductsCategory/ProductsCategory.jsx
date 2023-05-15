import { useEffect, useState } from "react";
//packages
import { Outlet, useFetcher, useLocation, useParams } from "react-router-dom";
//components
import ShowCategory from "../../components/ShowCategory/ShowCategory";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PriceSlider from "../../components/PriceSlider/PriceSlider";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import Brands from "../../components/Brands/Brands";
import ProductCart from "../../components/ProductCart/ProductCart";
import Error from "../../components/Error/Error";
//icons
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
//constants
import { sortedProductsItems } from "../../Constants";
//styles
import "./ProductsCategory.css";
import axios from "../../api/axios";

export default function ProductsCategory() {
  const [isShowSortList, setIsShowSortList] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortedStatus, setSortedStatus] = useState("");
  const { categoryName, subCategory } = useParams();


  const [minPrice, setMinPrice] = useState(parseInt(0));
  const [maxPrice, setMaxPrice] = useState(parseInt(100000));
  const [lowestPrice, setLowestPrice] = useState(parseInt(0));
  const [highestPrice, setHighestPrice] = useState(parseInt(100000));




  const [pageInfo, setPageInfo] = useState({
    isLoading: false,
    data: [],
    page: 1,
    pageSize: 20,
  });
  const getProductsBy=async()=>{
    setPageInfo(prev=>({...prev,isLoading:true}))
    await axios.get(`products?page=${pageInfo.page}&limit=${pageInfo.pageSize}&category=${categoryName}`)
    .then(res=>console.log("res",res))
  }
useEffect(()=>{
  getProductsBy()
},[pageInfo.page,pageInfo.pageSize])
  useEffect(() => {
    console.log("sortBy", sortBy);
  }, [sortBy]);
  useEffect(() => {
    console.log("categoryName",categoryName,"subCategory",subCategory);
  }, [categoryName, subCategory]);
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
            {/* <CategoryFilter categories={productsContext.categories} /> */}
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
                      {sortedStatus ? sortedStatus : "مرتب سازی بر اساس"}
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
                          setSortBy(item.sortedBy);
                          setIsShowSortList(false);
                          setSortedStatus(item.title);
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
            <div className="allProduct__category">
              {/* {!productsContext.errorProducts ? (
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
                        <Error title="هیچ محصولی یافت نشد"/>) : <div className="loadingSpiner"></div>
                      
                     
                       }
                    </>
                  ) : (
                    <div className="loadingSpiner"></div>
                  )}
                </>
              ) : (
                <>
                </>
              )} */}
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
