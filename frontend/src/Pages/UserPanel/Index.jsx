//components
import Header from "../../components/userPanel/Header/Header";
import SidebarUser from "../../components/userPanel/SidebarUser/SidebarUser";
//styles
import "./index.css";
const UserPanel = () => {
  return (
    <section className="userPanel">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Header />
          </div>
        </div>
        <div className="row">
          <SidebarUser />
        </div>
      </div>
    </section>
  );
};

export default UserPanel;
