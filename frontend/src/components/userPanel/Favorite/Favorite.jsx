//packages
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
//components
import Loader from "../../Loader/Loader";
//rtk query
import {
  useGetFavoriteQuery,
  useRemoveFromFavoriteMutation,
} from "../../../features/favorite/favoriteApislice";
//persian text
import { persianTexts } from "../../../text";
//styles
import "./Favorite.css";

const Favorite = () => {
  const [removeFromFavorite] = useRemoveFromFavoriteMutation();
  const {
    data: favoriteProducts,
    isLoading,
    isSuccess,
  } = useGetFavoriteQuery();
  const removeFromFavoriteHandler = (id) => {
    removeFromFavorite(id)
      .unwrap()
      .then((response) => {
        toast.success(persianTexts.favorite.removeFromFavorite.success);
      })
      .catch((error) => {
        toast.error(persianTexts.favorite.removeFromFavorite.error);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="favorite">
          <h3 className="favorite__header">{persianTexts.favorite.header}</h3>
          <div className="favorite__item-wrapper">
            {favoriteProducts?.length &&
              favoriteProducts.map((product) => (
                <div className="favorite__item" key={product._id}>
                  <div className="favorite__item-imageBox">
                    <img
                      src={`http://localhost:8000${product.image}`}
                      alt=""
                      className="favorite__item-image"
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
                      onClick={() => removeFromFavoriteHandler(product._id)}
                    >
                      {persianTexts.favorite.deleteBtn}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Favorite;
