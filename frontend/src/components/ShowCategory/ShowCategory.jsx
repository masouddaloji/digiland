import React, { memo, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import token from "../../utils/api";
import "./ShowCategory.css";

export default function ShowCategory({
  allCategory,
  categoryName,
  subCategory,
  setSortByStatus,
  isLoadingCategories,
}) {
  return (
    <>
      {!isLoadingCategories && (
        <>
          {categoryName && !subCategory ? (
            <>
              {allCategory.map((category) => (
                <>
                  {category.attributes.shortLink === categoryName &&
                  category.attributes.sub_categories.data.length ? (
                    <div className="product-category">
                      <div className="product-category__Wrapper">
                        <span
                          className="product-category__Title"
                          title="دسته بندی ها"
                        ></span>
                        <ul className="product-category__Lists">
                          {category.attributes.sub_categories.data.map(
                            (sub) => (
                              <li
                                className="product-category__Item"
                                key={sub.id}
                              >
                                <Link
                                  className="product-category__link"
                                  to={sub.attributes.link}
                                  onClick={()=>setSortByStatus(sub.attributes.shortLink)}
                                >
                                  {sub.attributes.img.data ? (
                                    <div className="product-category__iconBox">
                                      <img
                                        src={`http://localhost:1337${sub.attributes.img.data.attributes.url}`}
                                        alt=""
                                        className="product-category__img"
                                      />
                                    </div>
                                  ) : null}

                                  <span className="product-category__title">
                                    {sub.attributes.title}
                                  </span>
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </>
              ))}
            </>
          ) 
        
          : null}
        </>
      )}
    </>
  );
}




// : categoryName && subCategory ? (
//   <>
//     {allCategory.map((category) => (
//       <>
//         {category.attributes.shortLink === categoryName &&
//         category.attributes.sub_categories.data.length ? (
//           <>
//             {category.attributes.sub_categories.data.map((sub) => (
//               <>
//                 {sub.attributes.shortLink === subCategory &&
//                 sub.attributes.sub_subcategories.data.length ? (
//                   <div className="product-category">
//                     <div className="product-category__Wrapper">
//                       <span
//                         className="product-category__Title"
//                         title="دسته بندی ها"
//                       ></span>
//                       <ul className="product-category__Lists">
//                         {sub.attributes.sub_subcategories.data.map(
//                           (subSub) => (
//                             <li
//                               className="product-category__Item"
//                               key={sub.id}
//                             >
//                               <Link
//                                 className="product-category__link"
//                                 to={subSub.attributes.link}
//                               >
//                                 {subSub.attributes.cover.data ? (
//                                   <div className="product-category__iconBox">
//                                     <img
//                                       src={`http://localhost:1337${subSub.attributes.cover.data[0].attributes.url}`}
//                                       alt=""
//                                       className="product-category__img"
//                                     />
//                                   </div>
//                                 ) : null}

//                                 <span className="product-category__title">
//                                   {subSub.attributes.title}
//                                 </span>
//                               </Link>
//                             </li>
//                           )
//                         )}
//                       </ul>
//                     </div>
//                   </div>
//                 ) : null}
//               </>
//             ))}
//           </>
//         ) : null}
//       </>
//     ))}
//   </>
// ) 










