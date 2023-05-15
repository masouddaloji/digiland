import  { useContext, useRef } from "react";
// library
import { Link } from "react-router-dom";
// icons
import { FiChevronDown, FiPhoneCall } from "react-icons/fi";
import { BiHome } from "react-icons/bi";
// variables
import ProductsContext from "../../Context/ProductsContext";
import { menus } from "../../Constants";
// styles
import "./Navbar.css";

function Navbar() {
  const productContext = useContext(ProductsContext);
  const meniItemRef = useRef();
  const subMenuRef = useRef();
  return (
    <nav className="navbar">
      <div className="col-lg-10">
        <nav className="navbar__menu">
          <ul className="menus">
            <li className="menus__item">
              <Link className="menus__link" to="/">
                <BiHome className="icon" />
                <span className="menus__text">خانه</span>
              </Link>
            </li>
            {menus.map((menu) => (
              <li className="menus__item" key={menu.id} ref={meniItemRef}>
                <Link className="menus__link" to={menu.link}>
                  {menu.icon}
                  <span className="menus__text">{menu.title}</span>

                  {menu.subMenu && menu.subMenu.length ? (
                    <FiChevronDown />
                  ) : null}
                </Link>
                {menu.subMenu && menu.subMenu.length ? (
                  <ul className="submenu" ref={subMenuRef}>
                    {menu.subMenu.map((submenu) => (
                      <li className="submenu__item" key={submenu.id}>
                        <Link className="submenu__Link" to={submenu.link}>
                          {submenu.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="col-lg-2">
        <div className="contact">
          <div className="contact__number ss02">
            <strong>42156644</strong>
            <span>021</span>
          </div>
          <div className="header__phoneBox">
            <FiPhoneCall className="contact__icon fullIcon" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
