// import { memo, useEffect, useState } from "react";
// //packages
// import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// //constants
// import { menus } from "../../Constants";
// //styles
// import "./ShowCategory.css";

// export default function ShowCategory({ categoryName, subCategory }) {
//   let content
//   if(!categoryName) {
//     content= <div className="product-category">
//     <div className="product-category__Wrapper">
//       <span
//         className="product-category__Title"
//         title="دسته بندی ها"
//       ></span>
//       <ul className="product-category__Lists">
//         {menus.map((category)=> (
//           <li className="product-category__Item" key={uuidv4()}>
//             <Link
//               className="product-category__link"
//               to={category.link}
//             >
//               {category.img ? (
//                 <div className="product-category__iconBox">
//                   <img
//                     src={category.img}
//                     alt="sub menu image"
//                     className="product-category__img"
//                   />
//                 </div>
//               ) : null}

//               <span className="product-category__title">
//                 {category.title}
//               </span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>)
//   }
//   if (!subCategory){
//     content=menus.map(category=>{
//       if(category.shortLink===categoryName&& category.subMenu.length > 0){
//         return ( <div className="product-category">
//         <div className="product-category__Wrapper">
//           <span
//             className="product-category__Title"
//             title="زیرمجموعه ها"
//           ></span>
//           <ul className="product-category__Lists">
//             {category.subMenu.map((sub) => (
//               <li className="product-category__Item" key={uuidv4()}>
//                 <Link
//                   className="product-category__link"
//                   to={sub.link}
//                   // onClick={()=>setSortByStatus(sub.attributes.shortLink)}
//                 >
//                   {sub.img ? (
//                     <div className="product-category__iconBox">
//                       <img
//                         src={sub.img}
//                         alt="sub menu image"
//                         className="product-category__img"
//                       />
//                     </div>
//                   ) : null}

//                   <span className="product-category__title">
//                     {sub.title}
//                   </span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>)
//       }
//     })

//   }

//   return (
//     <>

//       {content}
//     </>
//   );
// }

import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { menus } from "../../Constants";
import "./ShowCategory.css";

const ShowCategory = ({ categoryName, subCategory }) => {
  console.log("categoryName", categoryName);
  console.log("subCategory", subCategory);
  let content;

  if (!categoryName) {
    content = (
      <div className="product-category">
        <div className="product-category__Wrapper">
          <span className="product-category__Title" title="دسته بندی ها"></span>
          <ul className="product-category__Lists">
            {menus.map(({ img, link, title, icon }) => (
              <li className="product-category__Item" key={link}>
                <Link className="product-category__link" to={link}>
                  {/* {img && (
                    <div className="product-category__iconBox">
                      <img
                        src={img}
                        alt="sub menu image"
                        className="product-category__img"
                      />
                    </div>
                  )} */}
                  {icon}

                  <span className="product-category__title">{title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  if (categoryName && !subCategory) {
    content = menus.map((category) => {
      if (category.shortLink === categoryName && category.subMenu.length > 0) {
        return (
          <div className="product-category">
            <div className="product-category__Wrapper">
              <span
                className="product-category__Title"
                title="زیرمجموعه ها"
              ></span>
              <ul className="product-category__Lists">
                {category.subMenu.map((sub) => (
                  <li className="product-category__Item" key={sub.id}>
                    <Link className="product-category__link" to={sub.link}>
                      {sub.img ? (
                        <div className="product-category__iconBox">
                          <img
                            src={sub.img}
                            alt="sub menu image"
                            className="product-category__img"
                          />
                        </div>
                      ) : null}

                      <span className="product-category__title">
                        {sub.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }
    });
  }

  return <>{content}</>;
};

export default ShowCategory;
