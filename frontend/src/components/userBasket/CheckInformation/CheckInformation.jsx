import { useEffect, useState } from "react";
//packages
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
//rtk query
import { useAddToOrderMutation } from "../../../features/order/orderApiSlice";
import { useGetBasketQuery } from "../../../features/basket/basketApiSlice";
import { useGetUserByIdQuery } from "../../../features/user/userApiSlice";
//hooks
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
//components
import FormControl from "../../FormControl/FormControl";
import Loader from "../../Loader/Loader";
//validator
import { checkInformationSchema } from "../../Validator/Validator";
//icons
import { TbDiscount2 } from "react-icons/tb";
//constants
import { Iran } from "../../../Constants";
//styles
import "./CheckInformation.css";
import { toast } from "react-toastify";

function CheckInformation() {
  useTitle("بررسی اطلاعات");
  const { userID } = useAuth();
  const [addToOrder] = useAddToOrderMutation();
  const navigate = useNavigate();
  const { data: basket, isLoading, isSuccess } = useGetBasketQuery();
  const {
    data: userInfos,
    isLoading: userInfosLoading,
    isSuccess: userInfosSuccess,
  } = useGetUserByIdQuery(userID);
  let initialValues = {
    checkFullName: userInfos?.name ?? "",
    checkProvince: userInfos?.addresses?.[0]?.state ?? "",
    checkCity: userInfos?.addresses?.[0]?.city ?? "",
    checkAddress: userInfos?.addresses?.[0]?.street ?? "",
    checkPostalCode: userInfos?.addresses?.[0]?.postalCode ?? "",
    checkTelephone: userInfos?.phone ?? "",
    acceptTerms: false,
  };

  const [showDiscount, setShowDiscount] = useState(false);
  const iranProvince = Object.keys(Iran);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [cities, setCities] = useState([]);
 

const addToOrderHandler = async () => {
  if (basket?.cartItems?.length) {
      addToOrder(basket.cartItems[0].productId._id).unwrap()
      .then(response=>{
        toast.success("سفارش شما با موفقیت ثبت شد")
        navigate(`/order-pay/${response.data._id}`)
      })
      .catch(error=>{
        toast.error("ثبت سفارش با مشکل مواجه شد")
      })
  }
}

  useEffect(() => {
    if (Iran[selectedProvince]) {
      setCities(Iran[selectedProvince]);
    } else {
      setCities(null);
    }
  }, [selectedProvince]);

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <Formik
          initialValues={initialValues}
          validationSchema={checkInformationSchema}
          onSubmit={async (values, { resetForm }) => {
            addToOrderHandler(values);
            resetForm();
          }}
        >
          {(formik) => (
            <div className="information">
              {/* start Discount */}
              <div className="useDiscount">
                <TbDiscount2 className="useDiscount__icon" />
                کد تخفیف دارید؟
                <span
                  className="useDiscount__showContent"
                  onClick={() => setShowDiscount(!showDiscount)}
                >
                  برای نوشتن کد اینجا کلیک کنید
                </span>
              </div>
              <div
                className={`discountCode`}
                style={{ display: showDiscount ? "block" : "none" }}
              >
                <span className="discountCode__title">کدتخفیف</span>
                <div className="discountCode__getCode">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="discountCode__input"
                    placeholder="کد تخفیف"
                  />
                  <button className="discountCode__btnSend">
                    اعمال کدتخفیف
                  </button>
                </div>
              </div>
              {/* end Discount */}
              <Form>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="user__form">
                      <div className="row">
                        <h3 className="purchaerDetails__title">
                          جزئیات صورتحساب
                        </h3>
                        <div className="col-12">
                          <FormControl
                            controler="text"
                            label="نام و نام خانوادگی"
                            name="checkFullName"
                          />
                        </div>
                        <div className="col-12 col-sm-6 col-md-12 col-lg-6">
                          <FormControl
                            controler="select"
                            label="استان"
                            name="checkProvince"
                            options={iranProvince}
                            placeholder="استان راانتخاب کنید"
                            selectType="province"
                            setSelectedProvince={setSelectedProvince}
                          />
                        </div>
                        <div className="col-12 col-sm-6 col-md-12 col-lg-6">
                          <FormControl
                            controler="select"
                            label="شهر"
                            name="checkCity"
                            placeholder="شهر راانتخاب کنید"
                            selectType="province"
                            options={cities}
                          />
                        </div>
                        <div className="col-12">
                          <FormControl
                            controler="text"
                            label="آدرس"
                            name="checkAddress"
                          />
                        </div>
                        <div className="col-12">
                          <FormControl
                            controler="text"
                            label="کد پستی"
                            name="checkPostalCode"
                          />
                        </div>
                        <div className="col-12">
                          <FormControl
                            controler="text"
                            label="تلفن"
                            name="checkTelephone"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="detailsOrder">
                      <h3 className="detailsOrder__title">سفارشات شما</h3>
                      <div className="orders">
                        <table className="orders__table">
                          <thead>
                            <tr>
                              <th>محصول</th>
                              <th>قیمت</th>
                            </tr>
                          </thead>
                          <tbody>
                            {basket?.cartItems?.map((item) => (
                              <tr key={item._id}>
                                <td>
                                  {item.productId.title}
                                  <span>
                                    {item.cartQuantity
                                      ? ` x ${item.cartQuantity}`
                                      : null}
                                  </span>
                                </td>
                                <td>
                                  <bdi className="productPrice">
                                    {item.productId.price.toLocaleString()}
                                    <span className="toman">تومان</span>
                                  </bdi>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th>جمع جزء</th>
                              <td>
                                <span>
                                  <bdi className="productPrice">
                                    {basket?.totalAmount?.toLocaleString()}
                                    <span className="toman">تومان</span>
                                  </bdi>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <th>هزینه حمل و نقل</th>
                              <td>
                                {basket?.totalAmount > 1000000 ? (
                                  " حمل و نقل رایگان"
                                ) : (
                                  <span>
                                    <bdi className="productPrice">
                                      200,000
                                      <span className="toman">تومان</span>
                                    </bdi>
                                  </span>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th>مجموع</th>
                              <td>
                                <span>
                                  <bdi className="productPrice">
                                    {basket?.totalAmount?.toLocaleString()}
                                    <span className="toman">تومان</span>
                                  </bdi>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <th>تخفیف شما از این خرید </th>
                              <td>
                                <span>
                                  <bdi className="productPrice">
                                    {(
                                      basket?.totalAmount / 500
                                    ).toLocaleString()}
                                    <span className="toman">تومان</span>
                                  </bdi>
                                </span>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      <div className="submit__order">
                        <FormControl controler="terms" name="acceptTerms" />

                        <button
                          className={`orderBtn ${
                            formik.dirty && formik.isValid
                              ? "orderBtn--active"
                              : null
                          }`}
                          disabled={!(formik.dirty && formik.isValid)}
                        >
                          ثبت سفارش
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
}

export default CheckInformation;
