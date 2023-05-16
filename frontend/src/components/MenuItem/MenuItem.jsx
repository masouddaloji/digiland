import { useState } from "react";
//packages
import { Link, useParams } from "react-router-dom";
//icons
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsFolder } from "react-icons/bs";
//styles
import "./MenuItem.css";

export default function MenuItem({ category }) {
  const { categoryName, subCategory } = useParams();
  const [isShowSubMenu, setIsShowSubMenu] = useState(false);
  return (
    <div className="menuItem">
      <Link
        to={category.link}
        className={`${ category.shortLink===categoryName ? "category__item--acvtive" : null}`}
      >
        <BsFolder className="menuItem__itemIcon" />
        {category.title}
      </Link>
      {category.subMenu.length > 0 ? (
        <>
          {!isShowSubMenu ? (
            <AiOutlinePlusCircle
              className={`menuItem__openIcon `}
              onClick={() => setIsShowSubMenu(true)}
            />
          ) : (
            <AiOutlineMinusCircle
              className="menuItem__closeIcon"
              onClick={() => setIsShowSubMenu(false)}
            />
          )}
          <ul
            className={`menuItem__subLists ${
              isShowSubMenu && "menuItem__subLists--show"
            }`}
          >
            {category.subMenu.map((sub) => (
              <li
                className={`menuItem__subItem ${
                  sub.shortLink === subCategory
                    ? "menuItem__subItem--active"
                    : null
                }`}
                key={sub.id}
              >
                <Link to={sub.link}>{sub.title}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
