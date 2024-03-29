import { useEffect, useState } from "react";
//packages
import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
//rtk query
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../features/user/userApiSlice";
//components//
import FormControl from "../../FormControl/FormControl";
import Loader from "../../Loader/Loader";
//validator
import { userUpdateSchema } from "../../Validator/Validator";
//constant
import { Iran } from "../../../Constants";
//persian text
import { persianTexts } from "../../../text";
//icons
import { MdUploadFile } from "react-icons/md";


const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { data: userInfos, isLoading, isSuccess } = useGetUserByIdQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const iranProvince = Object.keys(Iran);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [cities, setCities] = useState([]);

  let initialValues = {
    name: userInfos?.name ?? "",
    image: userInfos?.image ?? "",
    phone: userInfos?.phone ?? "",
    state: userInfos?.addresses[0]?.state ?? "",
    city: userInfos?.addresses[0]?.city ?? "",
    street: userInfos?.addresses[0]?.street ?? "",
    postalCode: userInfos?.addresses[0]?.postalCode ?? "",
  };
  const changeInfoHandler = (data) => {
    const userInfo = {
      ...(data.name && { name: data.name }),
      ...(data.image && { image: data.image }),
      ...(data.phone && { phone: data.phone }),
      ...((data.state || data.city || data.street || data.postalCode) && {
        addresses: [
          {
            ...(data.state && { state: data.state }),
            ...(data.city && { city: data.city }),
            ...(data.street && { street: data.street }),
            ...(data.postalCode && { postalCode: data.postalCode }),
          },
        ],
      }),
    };

    updateUser({ data: userInfo, id: userId })
      .unwrap()
      .then((res) => {
        toast.success(persianTexts.editUser.updateSuccess);
        navigate("/admin-users");
      })
      .catch((error) => {
        toast.error(persianTexts.editUser.updateError);
      });
  }

  useEffect(() => {
    if (Iran[selectedProvince]) setCities(Iran[selectedProvince]);
  }, [selectedProvince]);
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <Formik
          initialValues={initialValues}
          validationSchema={userUpdateSchema}
          onSubmit={async (values, { resetForm }) => {
            await changeInfoHandler(values);
            resetForm();
          }}
        >
          {(formik) => (
            <Form>
              <div className="userSetting">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <FormControl controler="text" label="نام" name="name" />
                  </div>
                  <div className="col-12 col-lg-6">
                    <FormControl controler="text" label="تلفن" name="phone" />
                  </div>
                  <div className="col-12 col-lg-6">
                    <FormControl
                      controler="select"
                      label="استان"
                      name="state"
                      options={iranProvince}
                      placeholder="لطفا یک استان راانتخاب کنید"
                      selectType="province"
                      setSelectedProvince={setSelectedProvince}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <FormControl
                      controler="select"
                      label="شهر"
                      name="city"
                      placeholder="لطفا یک شهر راانتخاب کنید"
                      selectType="province"
                      options={cities}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <FormControl
                      controler="text"
                      label="خیابان"
                      name="street"
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <FormControl
                      controler="text"
                      label="کد پستی"
                      name="postalCode"
                    />
                  </div>

                  <div className="col-12 col-lg-6">
                    <FormControl
                      label="پروفایل"
                      placeholder={
                        persianTexts.updateuserInfo.uploaderPlaceholder
                      }
                      controler="file"
                      accept="image/*"
                      name="image"
                      icon={<MdUploadFile className="uploader__icon" />}
                      typeuploader="profileUploader"
                    />
                  </div>
                  <div className="row btn__wrapper">
                    <button
                      className={`admin__btn ${
                        formik.dirty && formik.isValid && "admin__btn--active"
                      }`}
                      type="submit"
                      disabled={!(formik.dirty && formik.isValid)}
                    >
                      {persianTexts.updateuserInfo.submitBtn}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditUser;
