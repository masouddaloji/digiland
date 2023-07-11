import { useEffect, useState } from "react";
//packages
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
//redux
import { setToken } from "../features/auth/authSlice";
//rtk query
import { useLoginSocialMutation } from "../features/auth/authApiSlice";
//persian texts
import { persianTexts } from "../text";

const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [socialToken, setSocialToken] = useState(null);
  const [socialInfos, setSocialInfos] = useState(null);
  const [loginSocial] = useLoginSocialMutation();

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setSocialToken(tokenResponse?.access_token);
    },
    onError: (errorResponse) => {
      console.log("google error response", errorResponse);
    },
  });

  const getDataFromGoogle = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${socialToken}`,
        {
          headers: {
            Authorization: `Bearer ${socialToken}`,
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      setSocialInfos({ ...result });
    } catch (error) {
      console.log("error", error);
    }
  };

  const loginWithSocialinSiteHandler = async (data) => {

    loginSocial({
      username: data?.name,
      email: data?.email,
      profileUrl: data?.picture,
    })
      .unwrap()
      .then((res) => {
        dispatch(setToken({ accessToken: res?.accessToken }));
        toast.success(persianTexts.login.loginSuccess);
        navigate("/");
      })
      .catch((error) => {
        if (error.status && error.status === 401) {
                toast.error(persianTexts.login.loginNotMatch);
              } else {
                toast.error(persianTexts.login.loginError);
              }    
    }
    )
  };

  // get datails from google by google token
  useEffect(() => {
    if (socialToken) {
      getDataFromGoogle();
    }
  }, [socialToken]);
  // set google details for login in my site
  useEffect(() => {
    if (socialInfos) {
      loginWithSocialinSiteHandler({ ...socialInfos });
    }
  }, [socialInfos]);

  return { googleLoginHandler };
};

export default useGoogleAuth;
