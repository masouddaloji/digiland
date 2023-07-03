<<<<<<< HEAD
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
=======
import { useCallback, useEffect, useRef, useState } from "react";
>>>>>>> 33141c47ad9eb4d4803098adedfff5306c9a917b
// Packages
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
//redux
import { useDispatch } from "react-redux";
import { setToken } from "../../features/auth/authSlice";
//rtk query
import {
  useLoginSocialMutation,
  useLoginUserMutation,
} from "../../features/auth/authApiSlice";
// components
import FormControl from "../../components/FormControl/FormControl";
//hook
import usePersistLogin from "../../hooks/usePersistLogin";
import useTitle from "../../hooks/useTitle";
// validator
import { LoginSchema } from "../../components/Validator/Validator";
// icons
<<<<<<< HEAD
=======
import { FiUserPlus } from "react-icons/fi";
>>>>>>> 33141c47ad9eb4d4803098adedfff5306c9a917b
import { HiOutlineMail } from "react-icons/hi";
import { MdLock } from "react-icons/md";
// persian texts
import { persianTexts } from "../../text";
// style
import "./Login.css";


export default function Login() {
<<<<<<< HEAD
  const [loginUser] = useLoginUserMutation();
=======
  const [loginUser, { error }] = useLoginUserMutation();
>>>>>>> 33141c47ad9eb4d4803098adedfff5306c9a917b
  const [loginSocial] = useLoginSocialMutation();
  const [persist, setPersist] = usePersistLogin();
  const [socialToken, setSocialToken] = useState(null);
  const [socialInfos, setSocialInfos] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useTitle("صفحه ورود");

<<<<<<< HEAD
  const persistHandler = useCallback(() => {
    setPersist((prev) => !prev);
  }, []);
=======
  const persistHandler =useCallback( () => {
    setPersist((prev) => !prev);
  },[])
>>>>>>> 33141c47ad9eb4d4803098adedfff5306c9a917b

  const loginHandler = useCallback(async (data) => {
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
<<<<<<< HEAD
  }, []);
  const loginWithSocialinSiteHandler = useCallback(async (data) => {
=======
  },[])
  const loginWithSocialinSiteHandler =useCallback( async (data) => {
>>>>>>> 33141c47ad9eb4d4803098adedfff5306c9a917b
    try {
      const { accessToken } = await loginSocial({
        username: data?.name,
        email: data?.email,
        profileUrl: data?.picture,
      }).unwrap();
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
<<<<<<< HEAD
  }, []);

  const googleLoginHandler = useCallback(
    useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        setSocialToken(tokenResponse?.access_token);
      },
      onError: (errorResponse) => {
        console.log("google error response", errorResponse);
      },
    }),
    []
  );
  const getDataFromGoogle = useCallback(() => {
=======
  },[])

  const googleLoginHandler = useCallback(useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setSocialToken(tokenResponse?.access_token);
    },
    onError: (errorResponse) => {
      console.log("google error response", errorResponse);
    },
  }),[])
  const getDataFromGoogle=useCallback(()=>{
>>>>>>> 33141c47ad9eb4d4803098adedfff5306c9a917b
    fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${socialToken}`,
      {
        headers: {
          Authorization: `Bearer ${socialToken}`,
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setSocialInfos({ ...result });
      })
      .catch((error) => console.log("error", error));
<<<<<<< HEAD
  }, []);
  // get datails from google by google token
  useEffect(() => {
    if (socialToken) {
      getDataFromGoogle();
=======
  },[])
  // get datails from google by google token
  useEffect(() => {
    if (socialToken) {
      getDataFromGoogle()
>>>>>>> 33141c47ad9eb4d4803098adedfff5306c9a917b
    }
  }, [socialToken]);

  // set google details for login in my site
  useEffect(() => {
    if (socialInfos) {
      loginWithSocialinSiteHandler({ ...socialInfos });
    }
  }, [socialInfos]);

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
                        <div
                          className="accountBox"
                          onClick={googleLoginHandler}
                        >
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

