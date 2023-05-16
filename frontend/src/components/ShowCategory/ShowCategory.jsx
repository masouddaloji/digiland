import { memo, useEffect, useState } from "react";
//packages
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
//constants
import { menus } from "../../Constants";
//styles
import "./ShowCategory.css";

export default function ShowCategory({ categoryName, subCategory }) {
  return (
    <>
      {categoryName && !subCategory ? (
        <>
          {menus.map((category) => (
            <>
              {category.shortLink === categoryName &&
              category.subMenu.length > 0 ? (
                <div className="product-category">
                  <div className="product-category__Wrapper">
                    <span
                      className="product-category__Title"
                      title="دسته بندی ها"
                    ></span>
                    <ul className="product-category__Lists">
                      {category.subMenu.map((sub) => (
                        <li className="product-category__Item" key={uuidv4()}>
                          <Link
                            className="product-category__link"
                            to={sub.link}
                            // onClick={()=>setSortByStatus(sub.attributes.shortLink)}
                          >
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
              ) : null}
            </>
          ))}
        </>
      ) : null}
    </>
  );
}
