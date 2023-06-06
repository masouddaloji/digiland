import { useEffect, useState } from "react";
//packages
import { useNavigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../features/productsSlice";
import { selectToken } from "../../../features/auth/authSlice";
// components
import Table from "../Table/Table";
import Star from "../../Star/Star";
import CustomPagination from "../../Pagination/CustomPagination";
import LoaderComponent from "../../Loader/LoaderComponent";
//icons
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
// styles
import "./AdminProducts.css";
import Modal from "../../Modal/Modal";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [productIdSelected, setProductIdSelected] = useState(null);
  const dispatch = useDispatch();
  const { status, error, updateStatus, deleteStatus } = useSelector(
    (state) => state.products
  );
  const { data, hasNextPage, currentPage, lastPage, total } = useSelector(
    (state) => state.products.data
  );

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    countInPage: 10,
  });
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [productEditDetails, setProductEditDetails] = useState({});
  const token = useSelector(selectToken);

  const editHandler = () => {
    navigate(`/adminpanel/edit-product/${productIdSelected}`);
  };

  // const removeProductHandler = (id) => {
  //   dispatch(deleteProduct({id,token:token})).then(() =>
  //     dispatch(
  //       getProducts({ page: pageInfo.page, limit: pageInfo.countInPage })
  //     )
  //   );
  // };

  useEffect(() => {
    dispatch(getProducts({ page: pageInfo.page, limit: pageInfo.countInPage }));
  }, [pageInfo.page, pageInfo.countInPage]);

  return (
    <>
      {isShowEditModal && (
        <Modal
          message="آیا مایل به ویرایش محصول موردنظر هستید؟"
          isShow={isShowEditModal}
          setIsShow={setIsShowEditModal}
          action={editHandler}
        />
      )}
      <Table
        title="لیست محصولات"
        link="/adminpanel/add-products"
        linkTitle="افزودن محصول جدید"
      >
        <table>
          <thead>
            <tr>
              <td>عکس</td>
              <td>محصول</td>
              <td>قیمت</td>
              <td>تعداد</td>
              <td>دسته بندی</td>
              <td>برند</td>
              <td>امتیاز</td>
              <td>عملیات</td>
            </tr>
          </thead>
          {status === "success" ? (
            <>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="table__imageBox">
                        <img
                          src={`http://localhost:8000${item.image}`}
                          alt="product image"
                          className="table__img"
                        />
                      </div>
                    </td>
                    <td title={item.title}>{item.title}</td>
                    <td>{item.price.toLocaleString()}</td>
                    <td>{item.quantity}</td>
                    <td>{item.category}</td>
                    <td>{item.brand}</td>
                    <td>{Star(item.rating)}</td>
                    <td>
                      <div className="actionBtns">
                        <button
                          className="edit"
                          title="ویرایش"
                          onClick={() => {
                            setIsShowEditModal(true);
                            // setProductEditDetails({ ...item });
                            setProductIdSelected(item._id);
                          }}
                        >
                          <FiEdit className="actions__icon" />
                        </button>
                        <button
                          className="delete"
                          title="حذف"
                          onClick={() => removeProductHandler(item._id)}
                        >
                          <RiDeleteBinLine className="actions__icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <LoaderComponent />
          )}
        </table>
      </Table>
      {hasNextPage && (
        <CustomPagination
          setData={setPageInfo}
          page={currentPage}
          count={lastPage}
        />
      )}
    </>
  );
};

export default AdminProducts;
