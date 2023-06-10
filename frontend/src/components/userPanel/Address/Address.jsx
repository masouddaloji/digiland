//persian text
import { Link } from "react-router-dom";
import { persianTexts } from "../../../text";
//styles
import "./Address.css";
const Address = () => {
  return (
    <div className="address">
      <p className="address__description">{persianTexts.address.description}</p>
      <ul className="address__lists">
        <li className="address__item">
          <div className="address__header">
            <h4 className="address__title">
              {persianTexts.address.listHeader}
            </h4>
            <Link to="/usersetting" className="address__link">
              {persianTexts.address.link}
            </Link>
          </div>
          <div className="address__content">
            <div className="address__details">
                <span>امیرعلی</span>
            </div>
            <p className="address__details ss02">
            استان <span>تهران</span>،<span>آبسرد</span>،<span>رزچهارم</span>،پلاک<span>85</span>
            </p>
            <p className="address__details ss02">
                کد پستی : 
                <span>123456789</span>
            </p>
          </div>
        </li>
        <li className="address__item">
          <div className="address__header">
            <h4 className="address__title">
              {persianTexts.address.listHeader}
            </h4>
            <Link to="/usersetting" className="address__link">
              {persianTexts.address.link}
            </Link>
          </div>
          <div className="address__content">
            <div className="address__details">
                <span>امیرعلی</span>
            </div>
            <p className="address__details ss02">
            استان <span>تهران</span>،<span>آبسرد</span>،<span>رزچهارم</span>،پلاک<span>85</span>
            </p>
            <p className="address__details ss02">
                کد پستی : 
                <span>123456789</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Address;
