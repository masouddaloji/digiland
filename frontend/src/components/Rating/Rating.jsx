import React, { useEffect, useMemo, useRef, useState } from "react";
//packages
import { Form, Formik, useFormikContext } from "formik";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
//hooks
import useAuth from "./../../hooks/useAuth";
//components
import { privateAxios } from "../../api/axios";
import FormControl from "../FormControl/FormControl";
//validators
import { userRatingSchema } from "../Validator/Validator";
//constannst
import { ratingOptions } from "../../Constants";
//persian text
import { persianTexts } from "../../text";

//style
import "./Rating.css";

const Rating = ({getData}) => {
  const formikRef = useRef();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { productId } = useParams();
 
  return (
    <Formik
      ref={formikRef}
      initialValues={{
        userRating: "",
        userComment: "",
      }}
      validationSchema={userRatingSchema}
      onSubmit={async (values, { resetForm }) => {
        if (auth?.token) {
          const data = {
            rating: values.userRating,
            description: values.userComment,
          };
          await privateAxios
            .post(`products/reviews/${productId}`, data, {
              headers: {
                Authorization: `Bearer ${auth?.token}`,
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              if (res.status === 200 || res.status === 201) {
                toast.success(persianTexts.rating.submit.success);
                getData()
                resetForm();
              }else{
                toast.error(persianTexts.rating.submit.error)
              }
            });
        } else {
          toast.warning(persianTexts.rating.submit.warning);
          navigate("/login");
        }
      }}
    >
      {(formik) => (
        <div className="reviewForm__wrapper">
          <div className="reviewForm">
            <span className="reviewForm__title">دیدگاه خود را بنویسید</span>
            <Form className="reviewForm__form">
              <div className="row">
              <div className="col-12">
                    <FormControl
                      label="امتیاز شما *"
                      placeholder={
                        persianTexts.admin.products.placeholder
                          .inputPlaceholderRating
                      }
                      controler="select"
                      name="userRating"
                      options={ratingOptions}
                    />
                  </div>
              <div className="col-12">
                    <FormControl
                      label="دیدگاه شما *"
                      placeholder="لطفا دیدگاه خود را وارد کنید"
                      controler="textarea"
                      name="userComment"
                    />
                  </div>

                <div className="col-6">
                  <button type="submit" className="reviewForm__submit">
                    ثبت
                  </button>
                </div>
                  </div>

            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Rating;
