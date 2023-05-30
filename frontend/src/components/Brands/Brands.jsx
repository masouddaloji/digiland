//styles
import { brands } from "../../Constants";
import "./Brands.css";

export default function Brands({setFilter}) {
const filterHandler=(brand)=>{
  setFilter(prev=>({...prev,brand}))
}
  return (
    <div className="brands">
      {brands.map((brand) => (
        <div className="brands__brandBox" key={brand.id} onClick={()=>filterHandler(brand.title)}>
          {brand.icon}
          <span className="brands__brandTitle">{brand.text}</span>
        </div>
      ))}
    </div>
  );
}
