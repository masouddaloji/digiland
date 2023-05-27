import { createContext, useState } from "react";
// components
import privateAxios from "../api/privateAxios";
//packages
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//persianText
import { persianTexts } from "../text";
import { selectToken } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

export const UserBasketContext = createContext({});

const UserBasketContextProvider = ({ children }) => {
  const token=useSelector(selectToken)

  const navigate = useNavigate();
  const [basketInfo, setBasketInfo] = useState({});
  const getUserBasket = async () => {
    await privateAxios
      .get("basket", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBasketInfo(res?.data?.data);
      });
  };
  const removeItemFromBasket = async (productID) => {
    await privateAxios
      .delete(`basket/multi/${productID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          getUserBasket();
        }
      });
  };
  const addToBasketHandler = async (productId) => {
    if (token) {
      await privateAxios
        .put(
          `basket/${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.status === 200 || res?.status === 201) {
            toast.success(persianTexts.productInfo.addtobasketSuccess);
            getUserBasket();
          } else {
            toast.error(persianTexts.productInfo.addtobasketError);
          }
        });
    } else {
      toast.warning(persianTexts.productInfo.firstTologin);
      navigate("/login");
    }
  };
  const addToFavorite = async (productId) => {
    if (token) {
      await privateAxios.post(
        `users/favorate/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then(res=>{
        if(res.status===200){
          toast.success(persianTexts.productInfo.addtofavorateSuccess)
        }else{
          toast.error(persianTexts.productInfo.addtofavorateError)
        }
      })
    } else {
      toast.warning(persianTexts.productInfo.firstTologin);
      navigate("/login");
    }
  };
  return (
    <UserBasketContext.Provider
      value={{
        getUserBasket,
        removeItemFromBasket,
        addToBasketHandler,
        addToFavorite,
        basketInfo,
        setBasketInfo,
      }}
    >
      {children}
    </UserBasketContext.Provider>
  );
};
export default UserBasketContextProvider;
