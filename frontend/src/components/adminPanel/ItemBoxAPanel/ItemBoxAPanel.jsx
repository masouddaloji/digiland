// icons
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
// styles
import './ItemBoxAPanel.css'

const ItemBoxAPanel = (props) => {
  const { title, icon, amount, percent, positive,color } = props;
  return (
    <div className="panelBox ss02">
      <div className={`panelBox__iconWrapper ${color}`}>{icon}</div>
      <div className="panelBox__content">
        <div className="flex">
        
        {positive? 
        <span className="profitDetails panelBox__green">
        
        <AiOutlineArrowUp className="panelBox__arrow"/>
        +
        {percent}
        <i>%</i>
        </span>
        :
        <span className="profitDetails panelBox__red">
        <AiOutlineArrowDown className="panelBox__arrow"/>
        -
        {percent}
        <i>%</i>
        </span>}
        <span className="panelBox__amount">{amount.toLocaleString()}</span>
        </div>
        <span className="panelBox__title">{title}</span>
      </div>
    </div>
  );
};

export default ItemBoxAPanel;
