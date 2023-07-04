//packages
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
//rtk query
import {
  useGetArticleByIdQuery,
  useUpdateArticleMutation,
} from "../../../features/article/articleApiSlice";
//hooks
import useTitle from "../../../hooks/useTitle";
//components
import FormControl from "../../FormControl/FormControl";
import Loader from "../../Loader/Loader";
//validator
import { articleSchema } from "../../Validator/Validator";
//icons
import { MdUploadFile } from "react-icons/md";
//persian texts
import { persianTexts } from "../../../text";
//styles
import "./EditArticles.css";

const EditArticles = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const {
    data: article,
    isLoading,
    isSuccess,
  } = useGetArticleByIdQuery(articleId);
  useTitle("ویرایش مقاله");

  const [updateArticle] = useUpdateArticleMutation();
  const editArticleHandler =(articleInfo) => {
    const data = {
      title: articleInfo.articleTitle,
      image: articleInfo.articleImage,
      description: articleInfo.articleDescription,
      writer: articleInfo.articleWriter,
      category: articleInfo.articleCategory,
    };
    updateArticle({ id: articleId, data })
      .unwrap()
      .then((res) => {
        toast.success(persianTexts.editArticle.editArticleSuccess);
        navigate("/admin-articles");
      })
      .catch((error) => {
        toast.error(persianTexts.editArticle.editArticleError);
      });
  }

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <Formik
          initialValues={{
            articleTitle: article?.data?.title,
            articleImage: article?.data?.image,
            articleDescription: article?.data?.description,
            articleWriter: article?.data?.writer,
            articleCategory: article?.data?.category,
          }}
          validationSchema={articleSchema}
          onSubmit={async (values, { resetForm }) => {
            await editArticleHandler(values);
            resetForm();
          }}
        >
          {(formik) => (
            <Form>
              <div className="editArticles">
                <div className="col-12">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="col-12">
                        <FormControl
                          controler="text"
                          name="articleTitle"
                          label="عنوان"
                        />
                      </div>
                      <div className="col-12">
                        <FormControl
                          controler="text"
                          name="articleWriter"
                          label="نویسنده"
                        />
                      </div>
                      <div className="col-12">
                        <FormControl
                          controler="text"
                          name="articleCategory"
                          label="دسته بندی"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <FormControl
                        placeholder="کاور مقاله را انتخاب کنید"
                        controler="file"
                        accept="image/*"
                        name="articleImage"
                        icon={<MdUploadFile className="uploader__icon" />}
                        typeuploader="articleUploader"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <FormControl
                        controler="editor"
                        height={500}
                        name="articleDescription"
                      />
                    </div>
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

export default EditArticles;
