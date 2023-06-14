//constants
import { colorOptions } from "../../Constants";
//styles
import "./ColorFilter.css";

const ColorFilter = ({ filterInfo, setFilter }) => {
  const setColorHandler = (color) => {
    setFilter((prev) => ({ ...prev, color }));
  };
  return (
    <div className="colorFilter">
      {colorOptions.map((color) => (
        <div className="colerFilter__itemBox" key={color.id}>
          <div
            className={`colorFilter__itemImageBox ${
              filterInfo.color === color.value ? "selecedColor" : null
            }`}
          >
            <img
              className="color__option"
              title={color.value}
              src={color.img}
              onClick={() => setColorHandler(color.value)}
            />
          </div>
          <span className="colerFilter__itemTitle">{color.value}</span>
        </div>
      ))}
    </div>
  );
};

export default ColorFilter;
