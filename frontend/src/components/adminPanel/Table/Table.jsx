//packages
import { Link } from "react-router-dom";
// styles
import "./Table.css";

const Table = ({ children,title,link,linkTitle }) => {
  return (
    <div className="table">
      <div className="table__header">
        <h2 className="table__headerTitle">{title}</h2>
        {link && <Link className="table__btn" to={link}>{linkTitle}</Link>}
      </div>
     {children}
    </div>
  );
};

export default Table;
