import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { Colors } from "../../public/assets/colors";
import { signup } from "../actions/auth";
import Layout from "../hocs/layout";
import { useAuthReducer } from "../reducers/auth";
import { AppDispatch } from "../store";
import { errorToaster, isValidEmail, routes } from "../utils";
import images from "../utils/images";

const SignUpPage = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [repasswordType, setRePasswordType] = useState("password");
  const router = useRouter();
  const { user } = useAuthReducer();
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const RetogglePassword = () => {
    if (repasswordType === "password") {
      setRePasswordType("text")
      return;
    }
    setRePasswordType("password")
  }
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [passwordErrors, setPasswordErrors] = useState([]);
  const { name, email, password, re_password }: any = formData;

  const onChange = (e: { target: HTMLInputElement }) =>
    setFormData({ ...formData, [e.target.name]: e?.target?.value });

  const onSubmit = async (e: SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!isValidEmail(email) && !isNaN(email[0])) {
      setLoading(false);
      errorToaster("The provided email address is invalid.");
      return;
    }

    if (password !== re_password) {
      setLoading(false);
      errorToaster("The password and confirmation password do not align.");
      return;
    }
    try {
      const res = await dispatch(signup(name, email, password, re_password));
      if (res?.success) {
        setLoading(false);
        setAccountCreated(true);
      }

      if (res?.email) {
        setLoading(false);
        errorToaster("An account associated with this email address already exists.");
      }

      if (res?.password) {
        setLoading(false);
        setPasswordErrors(res?.password);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorToaster(
        "Please join the waitlist first by submitting a form on the home page."
      );
    }
  };

  if (accountCreated) {
    return (
      <>
        <Layout title="Adzviser | Login" content="Log In page for Adzviser">
          <div className="activePage mx-auto">
            <h1 style={{ padding: 20 }}>
              We sent the confirmation link to your email address.
            </h1>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <Layout
      title="Adzviser | Sign Up"
      content="Join our community today and get exclusive access to our tools and resources. Sign up now to experience the revolutionary power of Adzviser's Search Engine for marketing data."
      isAuthRequired={false}
    >

      <div className="ps-5 signUpText">
        <div className="d-flex">
          <div>
            <Image alt="" src={images.tickIcon} priority={true} />
          </div>
          <div className="ms-3">
            <h4 className="f-16 text-main bold-font pt-1">Get Data Quickly</h4>
            <p className="regular-font f-14 mt-3">Say goodbye to excessive clicking and mousing on Google Sheets extensions. Type your mind and fetch your data effortlessly.</p>
          </div>
        </div>
        <div className="d-flex mt-4">
          <div>
            <Image alt="" src={images.tickIcon} priority={true} />
          </div>
          <div className="ms-3">
            <h4 className="f-16 text-main bold-font pt-1">Multi-channel Connections</h4>
            <p className="regular-font f-14 mt-3">A range of data sources such as pay-per-click, paid social, web analytics, within a unified platform.</p>
          </div>
        </div>
        <div className="d-flex mt-4">
          <div>
            <Image alt="" src={images.tickIcon} priority={true} />
          </div>
          <div className="ms-3">
            <h4 className="f-16 text-main bold-font pt-1">Join Millions of Businesses</h4>
            <p className="regular-font f-14 mt-3">Adzviser is trusted by ambitious startups and enterprises of every size.</p>
          </div>
        </div>
      </div>
      <div className="mx-auto auth__row">
        <div className="authSignup">
          <div className="authMain">
            <div className="authMain__title text-center">
              <h2 className="medium-font">Sign up for <span className="text-main bold-font">adzviser</span></h2>
            </div>
            <form onSubmit={(e) => onSubmit(e)} className="formInputs">
              <div className="form-group mb-4">
                <input
                  className=""
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
                <Image
                  alt=""
                  src={images.userIcon}
                  style={{ height: "100%" }}
                  priority={true}
                />
              </div>
              <div className={"form-group mb-4"}>
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
                  alt=""
                  src={images.emailIcon}
                  style={{ height: "100%" }}
                  priority={true}
                />
              </div>

              <div className={"form-group mb-4"}>
                <input
                  className=""
                  type={passwordType}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
                <Image
                  alt=""
                  onClick={togglePassword}
                  src={passwordType === "password" ? images.hideeyeIcon : images.eyeIcon}
                  style={{ height: "100%" }}
                  priority={true}
                />
              </div>
              <div className={"form-group mb-4"}>
                <input
                  className=""
                  type={repasswordType}
                  placeholder="Re Password"
                  name="re_password"
                  value={re_password}
                  onChange={(e) => onChange(e)}
                  required
                />
                <Image
                  alt=""
                  onClick={RetogglePassword}
                  src={repasswordType === "password" ? images.hideeyeIcon : images.eyeIcon}
                  style={{ height: "100%" }}
                  priority={true}
                />
              </div>
              <div>
                <ul
                  style={{ marginTop: "12px", listStyle: "none" }}
                  className="validationErrorsList"
                >
                  {passwordErrors?.map((errorMessage, index) => {
                    return (
                      <li
                        key={errorMessage}
                        style={{
                          fontSize: "14px",
                          paddingTop: "4px",
                        }}
                      >
                        <AiOutlineCheck size={18} style={{ marginRight: 10 }} />
                        {errorMessage}
                      </li>
                    );
                  })}
                </ul>
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
                  <>{"Sign up"}</>
                )}
              </button>
            </form>
            <p className="authMain__accountButton mt-30 text-gray f-16 regular-font text-center">
              Have an account? <Link href={routes.login} className="bold-font">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
