import React from "react";
// library
import { Link } from "react-router-dom";
//styles
import "./ServiceBox.css";
export default function ServiceBox({ icon, title, link }) {
  return (
    <Link className="linkBox__link" to={link}>
      <div className="linkBox__iconBox">{icon}</div>
      <h4 className="linkBox__title">{title}</h4>
      <span className="ss02">+10 محصول</span>
    </Link>
  );
}
