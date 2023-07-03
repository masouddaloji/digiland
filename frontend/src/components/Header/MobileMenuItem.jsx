import { useState } from "react";
//package
import { Link } from "react-router-dom";
//icons
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const MobileMenuItem = (props) => {
  const { title, subMenu, link, setShow } = props;
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  return (
    <div
      className="mobileMenuLi"
      onClick={() => setIsShowMobileMenu(!isShowMobileMenu)}
    >
      <Link className="mobileMenu__link" to={link}>
        {title}
      </Link>
      {subMenu?.length ? (
        <>
          {!isShowMobileMenu ? (
            <FiChevronDown className="mobileMenu__dropdownIcon" />
          ) : (
            <FiChevronUp className="mobileMenu__dropdownIcon" />
          )}
          <ul
            className={`mobileMenu__submenu ${
              isShowMobileMenu && "mobileMenu__submenu--show"
            }`}
          >
            {subMenu.map((subMenu) => (
              <li
                className="mobileMenu__subItem"
                key={subMenu.id}
                onClick={() => setShow(false)}
              >
                <Link className="mobileMenu__subLink" to={subMenu.link}>
                  {subMenu.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default MobileMenuItem;
