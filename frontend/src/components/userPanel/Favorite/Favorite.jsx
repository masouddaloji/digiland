import { useCallback, useState } from "react";
//packages
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
//components
import Loader from "../../Loader/Loader";
import Modal from "../../Modal/Modal";
import Error from "../../Error/Error";
//hooks
import useTitle from "../../../hooks/useTitle";
//rtk query
import {
  useGetFavoriteQuery,
  useRemoveFromFavoriteMutation,
} from "../../../features/favorite/favoriteApislice";
//persian text
import { persianTexts } from "../../../text";
//utils
import { addImageFallback } from "../../../utils/utils";


const Favorite = () => {
  const [favoriteId,setFavoriteId]=useState(null)
  const [isshowDeleteFavorite,setIsshowDeleteFavorite]=useState(false)
  const [removeFromFavorite] = useRemoveFromFavoriteMutation();
  const {
    data: favoriteProducts,
    isLoading,
    isSuccess,
  } = useGetFavoriteQuery();

  const removeFromFavoriteHandler = () => {
    removeFromFavorite(favoriteId)
      .unwrap()
      .then((response) => {
        toast.success(persianTexts.favorite.removeFromFavorite.success);
      })
      .catch((error) => {
        toast.error(persianTexts.favorite.removeFromFavorite.error);
      });
  }

  useTitle("علاقه مندی ها")
  return (
    <>
         {isshowDeleteFavorite && (
        <Modal
          message={persianTexts.favorite.modalMessage}
          isShow={isshowDeleteFavorite}
          setIsShow={setIsshowDeleteFavorite}
          action={removeFromFavoriteHandler}
        />
      )}
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="favorite">
          <h3 className="favorite__header">{persianTexts.favorite.header}</h3>
          <div className="favorite__item-wrapper">
            {favoriteProducts?.length ?
              favoriteProducts.map((product) => (
                <div className="favorite__item" key={product._id}>
                  <div className="favorite__item-imageBox">
                    <img
                      src={`https://digiland-app.iran.liara.run${product.image}`}
                      alt=""
                      className="favorite__item-image"
                      onError={addImageFallback}
                    />
                  </div>
                  <h4 className="favorite__item-title">{product.title}</h4>
                  <div className="favorite__item-btns">
                    <Link
                      to={`/product/${product._id}`}
                      className="favorite__item-btn favorite__item-show"
                    >
                      {persianTexts.favorite.showBtn}
                    </Link>
                    <button
                      className="favorite__item-btn favorite__item-delete"
                      onClick={() => {
                        setFavoriteId(product._id)
                        setIsshowDeleteFavorite(true)
                      }}
                    >
                      {persianTexts.favorite.deleteBtn}
                    </button>
                  </div>
                </div>
              )):<Error type="warning" title={persianTexts.favorite.notFound} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Favorite;
