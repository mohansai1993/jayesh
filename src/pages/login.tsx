import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { Colors } from "../../public/assets/colors";
import { login } from "../actions/auth";
import Layout from "../hocs/layout";
import { useAuthReducer } from "../reducers/auth";
import { AppDispatch } from "../store";
import { errorToaster, routes } from "../utils";
import images from "../utils/images";
import axios from "axios";
import { REQUEST_HEADERS } from "commonRequestHeader";
import cookie from "cookie";
import { API_URL } from "../config";

export async function getServerSideProps(context:any) {
  const { req } = context;
  const cookies = cookie.parse(req?.headers?.cookie ?? "");
  const access = cookies?.access ?? false;

  if (!access) {
    return {
      props: {},
    };
  }
  //console.log("req is: ", req)
  try {
    const body = JSON.stringify({ token: access });
    const copterRes = await axios.post(
      `${API_URL}/auth/jwt/verify/`,
      body,
      REQUEST_HEADERS,
    );
    if (copterRes?.data?.code !== "token_not_valid") {
      return {
        redirect: {
          destination: routes.setUp,
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  } catch (err: any) {
    return {
      props: {},
    };
  }
}

const LoginPage = () => {
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuthReducer();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e: { target: HTMLInputElement }) =>
    setFormData({ ...formData, [e.target.name]: e?.target?.value });

  const onSubmit = async (e: SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    const res = await dispatch(login(email, password));
    if (res.success) {
      setLoading(false);
    }
    if (res?.error) {
      setLoading(false);
      errorToaster("Incorrect email or password.");
    }
  };

  useEffect(() => {
    user && router.push(routes.setUp);
  }, [user]);

  return (
    <Layout
      title="Adzviser | Login"
      content="Login to your account to access Adzviser's search engine for marketing data. Keep your information secure with our robust authentication measures."
    >
      <div className="mx-auto auth__row fromBox">
        <div className="authSignup">
          <div className="authMain">
            <div className="authMain__title text-center">
              <h2 className="medium-font">
                Sign in to <span className="text-main bold-font">Adzviser</span>
              </h2>
            </div>
            <form onSubmit={(e) => onSubmit(e)} className="formInputs">
              <div className={"form-group"}>
                <input
                  className=""
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
                <Image
                  alt="Login Image"
                  src={images.emailIcon}
                  style={{ height: "100%" }}
                  priority={true}
                />
              </div>
              <div className={"form-group"}>
                <input
                  className=""
                  type={passwordType}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  minLength={8}
                  required
                />
                <Image
                  alt=""
                  onClick={togglePassword}
                  src={
                    passwordType === "password"
                      ? images.hideeyeIcon
                      : images.eyeIcon
                  }
                  style={{ height: "100%" }}
                  priority={true}
                />
              </div>
              <div className="form-group__password text-end">
                <Link href={routes.resetPassword} className="tin-font f-16">
                  Forgot Password?
                </Link>
              </div>

              <button
                className="authMain__button medium-font formBtn all-center mx-auto"
                type="submit"
                style={{ background: Colors.Primary, textAlign: "center" }}
              >
                {isLoading ? (
                  <div className="d-flex justify-content-center">
                    <Oval
                      color={Colors.Secondary}
                      secondaryColor="#fff"
                      width={30}
                      height={30}
                    />
                  </div>
                ) : (
                  <>{"Sign In"}</>
                )}
              </button>
            </form>
            <p className="authMain__accountButton mt-30 text-gray f-16 regular-font text-center">
              Don&apos;t have an account?{" "}
              <Link href={routes.signup} className="bold-font">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
