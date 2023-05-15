import  { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import ShowCategory from "../../components/ShowCategory/ShowCategory";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import token from "../../utils/api";
import { BiPoll } from "react-icons/bi";
import PriceSlider from "../../components/PriceSlider/PriceSlider";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import Brands from "../../components/Brands/Brands";
import "./Category.css";

// export default function Category() {
//   const [titlePage, setTitlePage] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [CurrentCategory, setCurrentCategory] = useState("");
//   const [subcategory, setSubCategory] = useState("");
//   const currentLocation = useParams();

//   const getCategory = () => {
//     fetch(
//       "http://localhost:1337/api/categories?populate[sub_categories][populate]=*",
//       {
//         headers: { Authorization: `bearer ${token}` },
//       }
//     )
//       .then((res) => res.json())
//       .then((allData) => {
//         setCategories(allData.data);
//       });
//   };
//   useEffect(() => {
//     getCategory();
//   }, []);
//   useEffect(() => {
//     setCurrentCategory(currentLocation.categoryName);
//     setSubCategory(currentLocation.subCategory);
//   }, [currentLocation]);

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-12">
//           <Breadcrumb
//             categories={categories}
//             setCategories={setCategories}
//             getCategory={getCategory}
//           />
//         </div>
//         <ShowCategory
//           categories={categories}
//           setCategories={setCategories}
//           getCategory={getCategory}
//         />
//       </div>
//       <div className="row">
//         <div className="col-lg-3">
//           <PriceSlider />
//           <CategoryFilter categories={categories} />
//           <Brands />
//         </div>
//         <div className="col-lg-9">
//           <div className="pageTitle">
//             <div className="pageTitle__box">
//               <div className="pageTitle__rightBox">
//                 <BiPoll className="pageTitle__icon" />
//                 {CurrentCategory ? (
//                   <>
//                     {categories.map((category) => {
//                       if (category.attributes.shortLink === CurrentCategory) {
//                         return (
//                           <span className="pageTitle__title">
//                             {category.attributes.title}
//                           </span>
//                         );
//                       }
//                     })}
//                   </>
//                 ) : null}
//               </div>

//               <hr className="pageTitle__divider" />
//             </div>
//           </div>
//           {/*  */}


//           <div>
//       <p className="productsCategory__countResult">
//         نمایش دادن همه{" "}
//         <span className="productsCategory__counterResult">20</span> نتیجه
//       </p>
//       <div className="productsCategory__sortedBox">
//         <div className="productsCategory__sortWrapper">
//         <div className="productsCategory__showedBox"  onClick={()=>setIsShowSortList(!isShowSortList)}>
//         <span className="productsCategory__title">مرتب سازی بر اساس</span>
//         {!isShowSortList ? <AiOutlinePlusCircle className="productsCategory__icon"/> : <AiOutlineCloseCircle className="productsCategory__icon iconRed"/>}
         
//         </div>
//                     <ul className={`productsCategory__sorteLists ${isShowSortList ? "productsCategory__sorteLists--show":null}`}>
//             <li className="productsCategory__sorteItem" onClick={e=>setSortBy(e.target.innerHTML)}>مرتب‌ سازی بر اساس محبوبیت</li>
//             <li className="productsCategory__sorteItem" onClick={e=>setSortBy(e.target.innerHTML)}>مرتب‌ سازی بر اساس امتیاز</li>
//             <li className="productsCategory__sorteItem" onClick={e=>setSortBy(e.target.innerHTML)}>مرتب‌ سازی بر اساس آخرین</li>
//             <li className="productsCategory__sorteItem" onClick={e=>setSortBy(e.target.innerHTML)}>مرتب‌ سازی بر اساس ارزان ترین</li>
//             <li className="productsCategory__sorteItem" onClick={e=>setSortBy(e.target.innerHTML)}>مرتب‌ سازی بر اساس گران ترین</li>
//             <li className="productsCategory__sorteItem" onClick={e=>setSortBy(e.target.innerHTML)}>مرتب‌ سازی بر اساس موجودی</li>
//             <li className="productsCategory__sorteItem" onClick={e=>setSortBy(e.target.innerHTML)}>مرتب‌ سازی بر اساس پر فروش ترین</li>
//             <li className="productsCategory__sorteItem" onClick={e=>setSortBy(e.target.innerHTML)}>مرتب‌ سازی بر اساس بزودی </li>
//           </ul>
//         </div>
//       </div>
//     </div>
// {/*  */}
//         </div>
//       </div>
//     </div>
//   );
// }
