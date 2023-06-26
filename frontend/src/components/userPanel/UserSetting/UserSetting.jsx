import { useEffect, useState } from "react";
// packages
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//rtk query
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../features/user/userApiSlice";
// persian text
import { persianTexts } from "../../../text";
// components
import Loader from "../../Loader/Loader";
import FormControl from "../../FormControl/FormControl";
//validator
import { userUpdateSchema } from "../../Validator/Validator";
//hooks
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";
//constants
import { Iran } from "../../../Constants";
//icons
import { MdUploadFile } from "react-icons/md";
//styles
import "./UserSetting.css";

const UserSetting = () => {
  const navigate=useNavigate()
  const { userID } = useAuth();
  const [updateUser] = useUpdateUserMutation();
  const { data: userInfos, isLoading, isSuccess } = useGetUserByIdQuery(userID);
  const iranProvince = Object.keys(Iran);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [cities, setCities] = useState([]);
  useTitle("ویرایش اطلاعات");
  useEffect(() => {
    if (Iran[selectedProvince]) setCities(Iran[selectedProvince]);
  }, [selectedProvince]);


  const changeInfoHandler = (data) => {
    const userInfo = {
      ...(data.name ? { name: data.name }:null),
      ...(data.image ? { image: data.image }:null),
      ...(data.phone ? { phone: data.phone }:null),
      ...(data.state ||
        data.city ||
        data.street ||
        data.postalCode ? {
          addresses: [
            {
              ...(data.state ? { state: data.state }:null),
              ...(data.city ? { city: data.city }:null),
              ...(data.street ? { street: data.street }:null),
              ...(data.postalCode ? { postalCode: data.postalCode }:null),
            },
          ],
        }:null),
    };

    updateUser({ data: userInfo, id: userID })
      .unwrap()
      .then((res) => {
        toast.success("تغییرات با موفقیت ذخیره شد")
        navigate("/userpanel")
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("مشکلی در ذخیره تغییرات بوجود امد");
      });
  };
  console.log("userInfos",userInfos);
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <Formik
          initialValues={{
            name: userInfos?.name ?? "",
            image: userInfos?.image ?? "",
            phone: userInfos?.phone ?? "",
            state: userInfos?.addresses[0]?.state ?? "",
            city: userInfos?.addresses[0]?.city ?? "",
            street: userInfos?.addresses[0]?.street ?? "",
            postalCode: userInfos?.addresses[0]?.postalCode ?? "",
          }}
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
                  <div className="col-12 col-md-6 col-lg-6">
                    <FormControl controler="text" label="نام" name="name" />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <FormControl controler="text" label="تلفن" name="phone" />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
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
                  <div className="col-12 col-md-6 col-lg-6">
                    <FormControl
                      controler="select"
                      label="شهر"
                      name="city"
                      placeholder="لطفا یک شهر راانتخاب کنید"
                      selectType="province"
                      options={cities}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <FormControl
                      controler="text"
                      label="خیابان"
                      name="street"
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <FormControl
                      controler="text"
                      label="کد پستی"
                      name="postalCode"
                    />
                  </div>

                  <div className="col-12 col-md-6 col-lg-6">
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
                  <div className="col-12">
                    <button type="submit" className="userSetting__btn">
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

export default UserSetting;
