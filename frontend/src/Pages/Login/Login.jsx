import { useRef } from "react";
// Packages
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
//redux
import { useDispatch } from "react-redux";
import { setToken } from "../../features/auth/authSlice";
//rtk query
import { useLoginUserMutation } from "../../features/auth/authApiSlice";
// components
import FormControl from "../../components/FormControl/FormControl";
//hook
import usePersistLogin from "../../hooks/usePersistLogin";
// validator
import { LoginSchema } from "../../components/Validator/Validator";
// icons
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { MdLock } from "react-icons/md";
// persian texts
import { persianTexts } from "../../text";
// style
import "./Login.css";

export default function Login() {
  const [loginUser, { error }] = useLoginUserMutation();
  const [persist, setPersist] = usePersistLogin();
  const dispatch = useDispatch();
  const userNameRef = useRef();
  const navigate = useNavigate();

  const persistHandler = () => {
    setPersist((prev) => !prev);
  };
  const loginHandler = async (data) => {
    const userData = {
      email: data.loginUserName,
      pwd: data.loginPassword,
    };
    try {
      const { accessToken } = await loginUser(userData).unwrap();
      dispatch(setToken({ accessToken }));
      toast.success(persianTexts.login.logginSuccess);
      navigate("/");
    } catch (error) {
      if (error.status && error.status === 401) {
        toast.error(persianTexts.login.loginNotMatch);
      } else {
        toast.error(persianTexts.login.logginError);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        loginUserName: "",
        loginPassword: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        loginHandler(values);
        resetForm();
      }}
    >
      {(formik) => (
        <Form>
          <div className="auth">
            <div className="container">
              <div className="auth__wrapper">
                <div className="auth__imageBox">
                  <img
                    src="./images/auth/login -1.jpg"
                    className="auth__image"
                  />
                </div>
                <div className="auth__content">
                  <div className="auth__logoBox">
                    <img
                      className="auth__logoimg"
                      src="./images/logo-mobile.png"
                      alt=""
                    />
                  </div>

                  <div className="auth__form">
                  <h3 className="auth__title">
                    {persianTexts.login.headerTitle}
                  </h3>
                    <FormControl
                      controler="text"
                      label="نام کاربری"
                      name="loginUserName"
                      ref={userNameRef}
                      autoFocus
                      icon={<HiOutlineMail className="input__icon" />}
                    />
                    <FormControl
                      controler="password"
                      label="رمز عبور"
                      name="loginPassword"
                      icon={<MdLock className="input__icon" />}
                    />
                    <div className="login__btns">
                      <div className="login__checkbox">
                        <input
                          type="checkbox"
                          name="saveme"
                          id=""
                          checked={persist}
                          onChange={persistHandler}
                        />
                        <span className="login__checkboxText">
                          مرا به خاطر بسپار
                        </span>
                      </div>
                      <button type="submit" className="login__forget">
                        فراموشی گذرواژه
                      </button>
                    </div>
                    <button
                      disabled={!(formik.dirty && formik.isValid)}
                      type="submit"
                      className={`auth__btn ${
                        formik.dirty && formik.isValid && "auth__btn--active"
                      }`}
                    >
                      ورود
                    </button>
                    <div className="auth__loginOptions">
                    <span>{persianTexts.login.otherAcount}</span>
                    <div className="otherAccount">
                      <div className="accountBox">
                        <span>Discord</span>
                        <img
                          src="./images/auth/logo-discord.png"
                          alt="google logo"
                          className="account__image"
                        />
                      </div>
                      <div className="accountBox">
                        <span>Facebook</span>
                        <img
                          src="./images/auth/logo-facebook.png"
                          alt="google logo"
                          className="account__image"
                        />
                      </div>
                      <div className="accountBox">
                        <span>Google</span>
                        <img
                          src="./images/auth/logo-google.png"
                          alt="google logo"
                          className="account__image"
                        />
                      </div>
                    </div>
                    <span>
                      {persianTexts.login.notRegister}
                      <Link to="/register" className="login__registerLink">
                        {persianTexts.login.createAccountLink}
                      </Link>
                    </span>
                  </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
