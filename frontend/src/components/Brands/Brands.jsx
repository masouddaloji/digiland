//constants
import { HiChevronDown } from "react-icons/hi";
import { brands } from "../../Constants";
//styles
import "./Brands.css";

export default function Brands({ setFilter, categoryName, subCategory }) {
  const filterHandler = (brand) => {
    setFilter((prev) => ({ ...prev, brand }));
  };

  let uniqBrands = [];
  if (!categoryName && !subCategory) {
    const allBrands = Object.values(brands)
      .flatMap((category) => Object.values(category))
      .flatMap((subcategory) => subcategory.brands)
      .filter((brand) => brand);

    const includedTitle = new Set();

    for (const item of allBrands) {
      if (!includedTitle.has(item.title)) {
        includedTitle.add(item.title);
        uniqBrands.push(item);
      }
    }
  }
  if (categoryName && !subCategory) {
    const allBrands = Object.values(brands[categoryName]).flatMap((category) =>
      Object.values(category).flatMap((sub) => sub)
    );

    const includedTitle = new Set();

    for (const item of allBrands) {
      if (!includedTitle.has(item.title)) {
        includedTitle.add(item.title);
        uniqBrands.push(item);
      }
    }
  }

  if (subCategory) {
    const allBrands = brands[categoryName][subCategory].brands;
    uniqBrands = [...allBrands];
  }

  return (
    <div className="brands">
      {uniqBrands.map((brand) => (
        <div
          className="brands__brandBox"
          key={brand.id}
          onClick={() => filterHandler(brand.title)}
        >
          <img src={brand.img} className="brands__brandImg" alt="" />
          <span className="brands__brandTitle">{brand.perTitle}</span>
        </div>
      ))}

    </div>
  );
}
