//packages
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
//rtk query
import {
  useGetArticleByIdQuery,
  useUpdateArticleMutation,
} from "../../../features/article/articleApiSlice";
//components
import FormControl from "../../FormControl/FormControl";
//validator
import { articleSchema } from "../../Validator/Validator";
//icons
import { MdUploadFile } from "react-icons/md";
//persian texts
import { persianTexts } from "../../../text";
//styles
import "./EditArticles.css";
import Loader from "../../Loader/Loader";

const EditArticles = () => {
    const navigate = useNavigate();
  const { articleId } = useParams();
  const {
    data: article,
    isLoading,
    isSuccess,
  } = useGetArticleByIdQuery(articleId);


  const [updateArticle] = useUpdateArticleMutation();

  const initialValues = {
    articleTitle: article?.title ?? "",
    articleImage: article?.image ?? "",
    articleDescription: article?.description ?? "",
    articleWriter: article?.writer ?? "",
    articleCategory: article?.category ?? "",
  };

  const editArticleHandler = (articleInfo) => {
    const data = {
      title: articleInfo.articleTitle,
      image: articleInfo.articleImage,
      description: articleInfo.articleDescription,
      writer: articleInfo.articleWriter,
      category: articleInfo.articleCategory,
    };
    updateArticle({id:articleId,data})
      .unwrap()
      .then((res) => {
        toast.success(persianTexts.editArticle.editArticleSuccess);
        navigate("/admin-articles");
      })
      .catch((error) => {
        toast.error(persianTexts.editArticle.editArticleError);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && (
        <Formik
          initialValues={initialValues}
          validationSchema={articleSchema}
          onSubmit={async (values, { resetForm }) => {
            await editArticleHandler(values);
            resetForm();
          }}
        >
          {(formik) => (
            <Form>
              <div className="col-12">
                <div className="EditArticles">
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
                  <div className="row">
                    <div className="col-12">
                      <button
                        className={`admin__btn ${
                          formik.dirty && formik.isValid
                            ? "admin__btn--active"
                            : "admin__btn--disable"
                        }`}
                        type="submit"
                        disabled={!(formik.dirty && formik.isValid)}
                      >
                        {persianTexts.editArticle.btn}
                      </button>
                    </div>
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
