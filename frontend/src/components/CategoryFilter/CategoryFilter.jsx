//components
import MenuItem from "../MenuItem/MenuItem";
//styles

import "./CategoryFilter.css";

export default function CategoryFilter({ categories }) {
  return (
    <div className="categoryFilter">
      <ul className="categoryFilter__lists">
        {categories.map((category) => (
          <>
            <li className="categoryFilter__item" key={category.id}>
              <MenuItem category={category} />
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}
