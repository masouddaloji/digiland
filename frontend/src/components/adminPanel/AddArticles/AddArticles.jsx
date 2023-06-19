//packages
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//rtk query
import { useAddArticleMutation } from "../../../features/article/articleApiSlice";
//components
import FormControl from "../../FormControl/FormControl";
//validator
import { articleSchema } from "../../Validator/Validator";
//icons
import { MdUploadFile } from "react-icons/md";
//persian texts
import { persianTexts } from "../../../text";
//styles
import "./AddArticles.css";

const AddArticles = () => {
  const navigate=useNavigate()
  const [addArticle]=useAddArticleMutation()
  
  const initialValues = {
    articleTitle: "",
    articleImage: "",
    articleDescription: "",
    articleWriter: "",
    articleCategory: "",
  };
  const createNewArticle = (articleInfo) => {
    const data = {
      title: articleInfo.articleTitle,
      image: articleInfo.articleImage,
      description: articleInfo.articleDescription,
      writer: articleInfo.articleWriter,
      category: articleInfo.articleCategory,
    };
    addArticle(data).unwrap()
    .then(res=>{
      toast.success(persianTexts.addArticle.addArticleSuccess)
      navigate("/admin-articles")
    }).catch(error=>{
      toast.error(persianTexts.addArticle.addArticleError)
    })
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={articleSchema}
      onSubmit={async (values, { resetForm }) => {
        await createNewArticle(values);
        resetForm();
      }}
    >
      {(formik) => (
        <Form>
        <div className="col-12">
          <div className="addArticles">
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
                  {persianTexts.addArticle.addBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddArticles;
