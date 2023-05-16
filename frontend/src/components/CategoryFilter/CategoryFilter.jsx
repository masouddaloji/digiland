//components
import MenuItem from "../MenuItem/MenuItem";
//constants
import { menus } from "../../Constants";
//styles
import "./CategoryFilter.css";

export default function CategoryFilter({ category, setCategory }) {
  return (
    <div className="categoryFilter">
      <ul className="categoryFilter__lists">
        {menus.map((category) => (
            <li className="categoryFilter__item" key={category.id}>
              <MenuItem category={category} />
            </li>

        ))}
      </ul>
    </div>
  );
}
