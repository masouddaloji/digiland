//packages
import { useParams } from "react-router-dom";
//components
import Brands from "../Brands/Brands";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import ColorFilter from "../ColorFilter/ColorFilter";
import PriceSlider from "../PriceSlider/PriceSlider";

//styles
import "./SidebarFilter.css";
import SidebarFilterItem from "./SidebarFilterItem";

const SidebarFilter = ({ setPageInfo }) => {
  const { categoryName, subCategory } = useParams();
  return (
    <div className="filter">
      <SidebarFilterItem header=" فیلتر براساس قیمت :">
        <PriceSlider setPageInfo={setPageInfo} />
      </SidebarFilterItem>

      <SidebarFilterItem header=" دسته بندی محصولات :">
        <CategoryFilter category={categoryName} setCategory={setPageInfo} />
      </SidebarFilterItem>

      <SidebarFilterItem header=" برند ها :">
        <Brands
          setFilter={setPageInfo}
          categoryName={categoryName}
          subCategory={subCategory}
        />
      </SidebarFilterItem>

      <SidebarFilterItem header=" رنگ ها :">
      <ColorFilter setFilter={setPageInfo} />
      </SidebarFilterItem>
    </div>
  );
};

export default SidebarFilter;
