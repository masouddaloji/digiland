// icons
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
// styles
import "./ItemBoxAPanel.css";

const ItemBoxAPanel = (props) => {
  const { title, amount, percent, positive,isPrice } = props;
  return (
    <div className="panelBox ss02">
      <div className="panelBox__content">
        <span className="panelBox__title">{title}</span>
        <span className="panelBox__amount">{amount.toLocaleString()}
        {isPrice && <span>تومان</span>}
        </span>

        <div className="flex">
         
          <span className="panelBox__dataInfo">در این ماه</span>
          <span className="profitDetails">
            +<span>{percent}</span>
            <i>%</i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemBoxAPanel;
