import { useContext } from "react";
//context
import { UserBasketContext } from "../Context/UserBasketContext";

const useBasket = () => {
  return useContext(UserBasketContext);
};
export default useBasket;
