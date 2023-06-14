import { useRef } from "react";
//packages
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
//rtk query
import { useAddReviewMutation } from "../../features/review/reviewApiSlice";
//hooks
import useAuth from "../../hooks/useAuth";
//components
import FormControl from "../FormControl/FormControl";
//validators
import { userRatingSchema } from "../Validator/Validator";
//constannst
import { ratingOptions } from "../../Constants";
//persian text
import { persianTexts } from "../../text";

//style
import "./Rating.css";

const Rating = () => {
  const { userName } = useAuth();
  const formikRef = useRef();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [addReview] = useAddReviewMutation();

  const submitReviewHandler = (reviewDetails) => {
    const data = {
      rating: reviewDetails.userRating,
      description: reviewDetails.userComment,
    };
    addReview({ data, id: productId }).unwrap()
      .then((response) => {
        toast.success(persianTexts.rating.submit.success);
      })
      .catch((error) => {
        toast.error(persianTexts.rating.submit.error);
        console.log(error);
      });
  };
  return (
    <Formik
      ref={formikRef}
      initialValues={{
        userRating: "",
        userComment: "",
      }}
      validationSchema={userRatingSchema}
      onSubmit={async (values, { resetForm }) => {
        if (userName) {
         submitReviewHandler(values);
          resetForm();
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
                    selectType="rating"
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
                  <button type="submit" className="reviewForm__submit">ثبت نظر</button>
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
