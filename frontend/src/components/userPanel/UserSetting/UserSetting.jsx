import { useEffect, useState } from "react";
// packages
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
//rtk query
import { useUpdateUserMutation } from "../../../features/user/userApiSlice";
// persian text
import { persianTexts } from "../../../text";
// components
import FormControl from "../../FormControl/FormControl";
//validator
import { userUpdateSchema } from "../../Validator/Validator";
//hooks
import useAuth from "../../../hooks/useAuth";
//constants
import { Iran } from "../../../Constants";
//icons
import { MdUploadFile } from "react-icons/md";
//styles
import "./UserSetting.css";

const UserSetting = () => {
  const { userID } = useAuth();
  const [updateUser] = useUpdateUserMutation();
  const iranProvince = Object.keys(Iran);
  const [selectedProvince, setSelectedProvince]=useState("");
  const [cities, setCities] = useState([]);
  useEffect(() => {
    if(Iran[selectedProvince])setCities(Iran[selectedProvince]);
  }, [selectedProvince]);

  let initialValues = {
    name: "",
    image: "",
    phone: "",
    state: "",
    city: "",
    street: "",
    postalCode: "",
  };
  const changeInfoHandler = (data) => {
    const userInfo = {
      name: data.name ?? "",
      image: data.image ?? "",
      phone: data.phone ?? "",
      addresses: [{
        state: data.state ?? "",
        city: data.city ?? "",
        street: data.street ?? "",
        postalCode: data.postalCode ?? "",
      }],
    };
    console.log("userInfo",{...userInfo})
    updateUser({ data: {...userInfo}, id: userID })
      .unwrap()
      .then((res) => toast.success("تغییرات با موفقیت ذخیره شد"))
      .catch((error) => {
        console.log("error",error)
        toast.error("مشکلی در ذخیره تغییرات بوجود امد")
      });
  };
  return (
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
              <div className="col-12">
                <FormControl controler="text" label="نام" name="name" />
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
              <div className="col-12">
                <FormControl controler="text" label="خیابان" name="street" />
              </div>
              <div className="col-12">
                <FormControl
                  controler="text"
                  label="کد پستی"
                  name="postalCode"
                />
              </div>
              <div className="col-12">
                <FormControl controler="text" label="تلفن" name="phone" />
              </div>

              <div className="col-12 col-lg-6">
                <FormControl
                  label="پروفایل"
                  placeholder={persianTexts.updateuserInfo.uploaderPlaceholder}
                  controler="file"
                  accept="image/*"
                  name="productCover"
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
  );
};

export default UserSetting;
