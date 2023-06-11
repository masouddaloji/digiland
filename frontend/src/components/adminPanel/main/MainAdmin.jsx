import { useEffect, useState } from "react";
// components
import Chart from "../Chart/Chart";
import ItemBoxAPanel from "../ItemBoxAPanel/ItemBoxAPanel";
// adminPanelItems
import { adminPanelItems } from "./../../../Constants";
// styles
import "./MainAdmin.css";

import Loader from "../../Loader/Loader";

const MainAdmin = () => {
  const [pageDetails, setPageDetails] = useState({
    isLoading: false,
    newProducts: [],
  });

  return (
    <div className="indexAdmin">
      <div className="row">
        {adminPanelItems.map((item) => (
          <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={item.id}>
            <ItemBoxAPanel {...item} />
          </div>
        ))}

        <div className="col-12">
          <Chart />
        </div>

        {/* table */}
      </div>
    </div>
  );
};

export default MainAdmin;
