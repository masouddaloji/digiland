//icons
import {IoWarningOutline} from 'react-icons/io5'
import { BiErrorAlt } from "react-icons/bi";
// styles
import "./Error.css";

const Error = ({ title, type }) => {
  const selectIcon = (type) => {
    switch (type) {
      case "error": return <BiErrorAlt className="error__icon"/>
      case "warning":return <IoWarningOutline className="error__icon"/>

      default:
        break;
    }
  };
  return (
    <div className={`error__wrapper ${type==="warning"?"yellow":"red"}`}>
    {selectIcon(type)}
      <p className="error__title">{title}</p>
    </div>
  );
};

export default Error;
