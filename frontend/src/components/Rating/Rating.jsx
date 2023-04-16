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
//validators
import { userRatingSchema } from "../Validator/Validator";
//persian text
import { persianTexts } from "../../text";
//icons
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
//style
import "./Rating.css";

const Rating = () => {
  const [rating, setRating] = useState(null);
  const [hoverStar, setHoverStar] = useState(null);
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
              <div className="reviewForm__ratingWrapper">
                <label className="reviewForm__ratingTitle">امتیاز شما * </label>
              </div>
              <div className="row">
                <div className="reatingStar__wrapper" name="userRating">
                  {Array(5)
                    .fill()
                    .map((_, index) =>
                      rating >= index + 1 || hoverStar >= index + 1 ? (
                        <IoIosStar
                          key={uuidv4()}
                          className="star ratingSatr"
                          onClick={() => {
                            formik.setFieldTouched("userRating", true);
                            formik.setFieldValue("userRating", index + 1);
                            setRating(index + 1);
                          }}
                          onMouseOver={() => setHoverStar(index + 1)}
                          onMouseLeave={() =>
                            setHoverStar(formik.values.userRating)
                          }
                        />
                      ) : (
                        <IoIosStarOutline
                          key={uuidv4()}
                          className="star ratingSatr"
                          onClick={() => {
                            formik.setFieldTouched("userRating", true);
                            formik.setFieldValue("userRating", index + 1);
                            setRating(index + 1);
                          }}
                          onMouseOver={() => setHoverStar(index + 1)}
                          onMouseLeave={() =>
                            setHoverStar(formik.values.userRating)
                          }
                        />
                      )
                    )}
                </div>
                {formik.touched.userRating && formik.errors.userRating ? (
                  <span>{formik.errors.userRating}</span>
                ) : null}

                <div className="reviewForm__commentWrapper">
                  <label className="reviewForm__commentTitle" htmlFor="comment">
                    دیدگاه شما *
                  </label>
                  <textarea
                    name="userComment"
                    className="reviewForm__commentTextArea"
                    {...formik.getFieldProps("userComment")}
                  ></textarea>
                  {formik.touched.userComment && formik.errors.userComment ? (
                    <span>{formik.errors.userComment}</span>
                  ) : null}
                </div>
                <div className="reviewForm__submitWrapper">
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
