import { useEffect, useState } from "react";
// components
import Chart from "../Chart/Chart";
import ItemBoxAPanel from "../ItemBoxAPanel/ItemBoxAPanel";
import BestSellingTable from "../Table/Table";
//import variables
import { adminPanelItems } from "./../../../Constants";
// styles
import "./MainAdmin.css";
import Table from "../Table/Table";
import axios from "../../../api/axios";
import Loader from "../../Loader/Loader";
import Star from "../../Star/Star";

const MainAdmin = () => {
  const [pageDetails,setPageDetails]=useState({
    isLoading:false,
    newProducts:[]
  })
  useEffect(()=>{
    setPageDetails(prev=>({...prev,isLoading:true}))
    const getData=async()=>{
      await axios.get("products?page=1&limit=6")
      .then(res=>setPageDetails(prev=>({...prev,isLoading:false,newProducts:res?.data?.data})))
      .catch(error=>console.log(error))
    }
    getData()
  },[])
  return (
 <>
  {!pageDetails.isLoading?   <section className="adminSection">
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
          <Table title="جدیدترین محصولات" link="/adminpanel/products" linkTitle="نمایش همه">
            <table>
              <thead>
                <tr>
                  <td>عکس</td>
                  <td>محصول</td>
                  <td>قیمت</td>
                  <td>تعداد</td>
                  <td>دسته بندی</td>
                  <td>برند</td>
                  <td>امتیاز</td>
                </tr>
              </thead>
              <tbody>
              {pageDetails.newProducts?.map(item=>  <tr key={item._id}>
                  <td>
                    <div className="table__imageBox">
                      <img src={`http://localhost:8000${item.image}`} alt="" className="table__img"/>
                    </div>
                  </td>
                  <td title={item.title}>{item.title}</td>
                  <td>{item.price.toLocaleString()}</td>
                  <td>{item.quantity}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>{Star(item.rating)}</td>
                </tr>)}
              
              </tbody>
            </table>
          </Table>
        </div>
        <div className="row">
          <div className="col-12"></div>
        </div>
      </div>
    </section>:<Loader/>}
 </>
  );
};

export default MainAdmin;
