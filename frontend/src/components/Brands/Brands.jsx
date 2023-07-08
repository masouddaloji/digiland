import {  useMemo, useState } from "react";
//constants
import { HiChevronDown } from "react-icons/hi";
import { brands } from "../../Constants";
//styles
import "./Brands.css";

export default function Brands({
  filterInfo,
  setFilter,
  categoryName,
  subCategory,
}) {
  const [searchedBrand, setSearchedBrand] = useState("");
  const filterHandler = (brand) => {
    setFilter((prev) => ({ ...prev, brand }));
  }

  let uniqBrands = useMemo(() => {
    let currentBrandbyPage = [];
    if (!categoryName && !subCategory) {
      const allBrands = brands
        ? Object.values(brands)
            .flatMap((category) => Object.values(category))
            .flatMap((subcategory) => subcategory.brands)
            .filter((brand) => brand)
        : [];

      const includedTitle = new Set();

      for (const item of allBrands) {
        if (!includedTitle.has(item.title)) {
          includedTitle.add(item.title);
          currentBrandbyPage.push(item);
        }
      }
    }
    if (categoryName && !subCategory) {
      const allBrands =brands? Object.values(brands[categoryName]).flatMap(
        (category) => Object.values(category).flatMap((sub) => sub)
      ):[];

      const includedTitle = new Set();

      for (const item of allBrands) {
        if (!includedTitle.has(item.title)) {
          includedTitle.add(item.title);
          currentBrandbyPage.push(item);
        }
      }
    }

    if (subCategory) {
      const allBrands = brands?.[categoryName]?.[subCategory]?.brands??[];
      currentBrandbyPage = [...allBrands];
    }
    return currentBrandbyPage;
  }, [categoryName, subCategory]);

  let filteredBrandsBySearch = uniqBrands.filter(
    (brand) =>
      brand.perTitle.includes(searchedBrand.trim()) ||
      brand.title.includes(searchedBrand.trim())
  );
  return (
    <ul className="brands">
      {filteredBrandsBySearch?.length ? (
        <>
          <li>
            <input
              type="search"
              className="filter__input"
              placeholder="جستجوی برند ها"
              value={searchedBrand}
              onChange={(e) => setSearchedBrand(e.target.value)}
            />
          </li>
          {filteredBrandsBySearch.map((brand) => (
            <li
              className={`brands__brandBox`}
              key={brand.id}
              onClick={() => filterHandler(brand.title)}
            >
              <input
                type="checkbox"
                checked={filterInfo.brand === brand.title}
              />
              <img src={brand.img} className="brands__brandImg" alt="" />
              <span className="brands__brandTitle">{brand.perTitle}</span>
            </li>
          ))}
        </>
      ) : null}
    </ul>
  );
}
