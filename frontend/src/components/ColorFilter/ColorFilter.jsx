//constants
import { colorOptions } from "../../Constants";
//styles
import "./ColorFilter.css";

const ColorFilter = ({ setFilter }) => {
  const setColorHandler = (color) => {
    setFilter((prev) => ({ ...prev, color }));
  };
  return (
    <div className="colorFilter">
      {colorOptions.map((color) => (
        <div
          className="color__option"
          title={color.value}
          style={{ backgroundColor: color.color }}
          onClick={() => setColorHandler(color.value)}
        ></div>
      ))}
    </div>
  );
};

export default ColorFilter;
