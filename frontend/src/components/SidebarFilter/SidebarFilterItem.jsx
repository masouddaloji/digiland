import { useState } from "react";
//icons
import { HiChevronDown } from "react-icons/hi";

const SidebarFilterItem = ({ header, highLight, isPrice, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  let splitedFirstPrice = isPrice && highLight.split("/")[0];
  let splitedLastPrice = isPrice && highLight.split("/")[1];
  return (
    <div className="filterItem">
      <div className="filterItem__header">
        <p className="filterItem__headerTitle">
          {header}
          {highLight && !isPrice ? (
            <span className="filterItem__selected">{highLight}</span>
          ) : highLight && isPrice ? (
            <>
              <span>
              <span className="filterItem__selected ss02">از  {Number(splitedFirstPrice).toLocaleString()}</span><span className="filterItem__selected ss02">تا  {Number(splitedLastPrice).toLocaleString()}</span>
              </span>
              
            </>
          ) : null}
        </p>

        <HiChevronDown
          className={`filter__icon ${isOpen ? "rotate" : null}`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div
        className={`filter__content ${isOpen ? "filter__content--show" : null}`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarFilterItem;
