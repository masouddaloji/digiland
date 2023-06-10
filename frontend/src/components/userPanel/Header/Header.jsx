//packages
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//rtk query
import { useLogOutUserMutation } from "../../../features/auth/authApiSlice";
//icons
import { BiHome } from "react-icons/bi";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { AiOutlinePoweroff } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
//persianTexts
import { persianTexts } from "../../../text";
//styles
import "./Header.css";

const Header = ({ setshow }) => {
  const navigate = useNavigate();
  const [logOutUser] = useLogOutUserMutation();
  const logOutHandler = () => {
    logOutUser()
      .unwrap()
      .then((res) => {
        toast.success(persianTexts.useLogout.logoutSuccess);
        navigate("/");
      })
      .catch((error) => toast.error(persianTexts.useLogout.logoutError));
  };
  return (
    <div className="userpanel__header">
      <RxHamburgerMenu
        className="userpanel__headerIcon userpanel__menuBtn"
        onClick={() => setshow(true)}
      />
      <div className="userpanel__headerItem logout" onClick={logOutHandler}>
        <AiOutlinePoweroff className="userpanel__headerIcon" />
      </div>
      <Link className="userpanel__headerItem">
        <HiOutlineCog6Tooth className="userpanel__headerIcon" />
      </Link>

      <Link to="/" className="userpanel__headerItem">
        <BiHome className="userpanel__headerIcon" />
      </Link>
    </div>
  );
};

export default Header;
