
      {/* <Table
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
      )} */}