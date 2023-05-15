import { useState } from "react";
//packages
import { useParams } from "react-router-dom";
//icons
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsFolder } from "react-icons/bs";
//styles
import "./MenuItem.css";

export default function MenuItem({ category }) {
  const categoryLocation = useParams();

  const [isShowSubMenu, setIsShowSubMenu] = useState(false);
  return (
    <div className="menuItem" onClick={() => setIsShowSubMenu(!isShowSubMenu)}>
      <span
        className={`${
          categoryLocation.categoryName === category.shortLink
            ? "acvtive"
            : null
        }`}
      >
        <BsFolder className="menuItem__itemIcon" />
        {category.title}
      </span>
      {category.sub_categories.data.length ? (
        <>
          {!isShowSubMenu ? (
            <AiOutlinePlusCircle className={`menuItem__openIcon `} />
          ) : (
            <AiOutlineMinusCircle className="menuItem__closeIcon" />
          )}
          <ul
            className={`menuItem__subLists ${
              isShowSubMenu && "menuItem__subLists--show"
            }`}
          >
            {category.sub_categories.data.map((subCategory) => (
              <li className="menuItem__subItem">
                {subCategory.attributes.title}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
