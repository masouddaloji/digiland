import React from "react";
// components
import Chart from "../Chart/Chart";
import ItemBoxAPanel from "../ItemBoxAPanel/ItemBoxAPanel";
import BestSellingTable from "./../BestSellingTable/BestSellingTable";
//import variables
import { adminPanelItems } from "./../../../Constants";
// styles
import "./MainAdmin.css";

const MainAdmin = () => {
  return (
    <section className="adminSection">
      <div className="row">
        {adminPanelItems.map((item) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={item.id}>
            <ItemBoxAPanel {...item} />
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-12">
          <Chart />
        </div>
      </div>
      <div className="row">
      <div className="col-12">
          <BestSellingTable />
<<<<<<< HEAD
        </div>
        <div className="row">
          <div className="col-12">
            
          </div>
=======
>>>>>>> 8286f47708ee9e22b8122f0a5b174b8dcf4c78d7
        </div>
      </div>
    </section>
  );
};

export default MainAdmin;
