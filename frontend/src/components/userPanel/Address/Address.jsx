//packages
import { Link } from "react-router-dom";
//rtk query
import { useGetUserByIdQuery } from "../../../features/user/userApiSlice";
//components
import Loader from "../../Loader/Loader";
//hooks
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";
//persian text
import { persianTexts } from "../../../text";
//styles
import "./Address.css";

const Address = () => {
  const { userID } = useAuth();
  const { data, isLoading, isSuccess } = useGetUserByIdQuery(userID);
  useTitle("آدرس ها")
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="address">
          <p className="address__description">
            {persianTexts.address.description}
          </p>
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
                  استان <span>{data?.addresses?.[0]?.state}</span>،
                  <span>{data?.addresses?.[0]?.city}</span>،
                  <span>{data?.addresses?.[0]?.street}</span>
                </p>
                <p className="address__details ss02">
                  کد پستی :<span>{data?.addresses?.[0]?.postalCode}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Address;
