import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

import "./SectionHeader.css";

export default function SectionHeader({ title, link, icon, btnLink }) {
  return (
    <div className="headerTitleBox">
      <div className="rightBox">
        {icon}
        <Link className="headerTitle__link" to="/">
          {title}
        </Link>
      </div>
      {btnLink && (
        <div className="leftBox">
          <Link to={link} className="headerTitle__btn">
            <div className="headerTitle__btnWrapper">
              <HiChevronLeft className="fullIcon section__btn" />
            </div>
            مشاهده همه
          </Link>
        </div>
      )}
    </div>
  );
}
