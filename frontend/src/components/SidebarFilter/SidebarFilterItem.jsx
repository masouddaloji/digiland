import { useState } from "react";
//icons
import { HiChevronDown } from "react-icons/hi";

const SidebarFilterItem = ({header ,children}) => {
    const [isOpen,setIsOpen]=useState(false)
  return (
    <div className="filterItem">
      <span className="filterItem__header">{header} 
      <HiChevronDown className="filter__icon" onClick={()=>setIsOpen(!isOpen)}/>
      </span>
      <div className={`filter__content ${isOpen?"filter__content--show":null}`}>
      {children}
      </div>
    </div>
  );
};

export default SidebarFilterItem;
