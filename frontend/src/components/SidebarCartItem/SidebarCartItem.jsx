//packages
import { Link } from 'react-router-dom';
// components
import ProductCount from "../ProductCount/ProductCount";
// icons
import { CgCloseO } from "react-icons/cg";
//styles
import './SidebarCartItem.css'

const SidebarCartItem = (props) => {
  const{_id,productId,cartQuantity}=props
  const {title,image,price,quantity}=productId
  return (
    <li className="sideBarCart__ListsItem" key={_id}>
      {" "}
      <div className="sideBarCart__imgBox">
        <Link to={`/product/${_id}`} className="sideBarCart__Link">
          <img
            src={`http://localhost:8000${image}`}
            alt="mini image products"
            className="sideBarCart__img"
          />
        </Link>
        <CgCloseO
          className="sideBarCart__removeIcon"
          onClick={() => removeProductFromBasketHandler(_id)}
        />
      </div>
      <div className="sideBarCart__priceBox">
        <Link to="/" className="sideBarCart__LinkText">
          {title}
        </Link>
        <div className="flex">
          <bdi className="currentPrice ss02">
            {price?.toLocaleString()}
            <span className="toman">تومان</span>
          </bdi>
          <ProductCount
            value={cartQuantity ?? 1}
            minValue={1}
            maxValue={quantity}
            productId={_id}
          />
        </div>
      </div>
    </li>
  );
};

export default SidebarCartItem;
