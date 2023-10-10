import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import Layout from "../hocs/layout";
import { Oval } from "react-loader-spinner";
import { resetPassword } from "../actions/auth";
import { routes, errorToaster, infoToaster } from "../utils";
import { useAuthReducer } from "../reducers/auth";
import { AppDispatch } from "../store";
import { Colors } from "../../public/assets/colors";
import Link from "next/link";

const ResetPasswordPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { loading } = useAuthReducer();
  const [requestSent, setRequestSent] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;
  const onChange = (e: { target: HTMLInputElement }) =>
    setFormData({ ...formData, [e.target.name]: e?.target?.value });

  const onSubmit = async (e: SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    const res = await dispatch(resetPassword(email));
    if (res?.success) {
      setLoading(false);
      setRequestSent(true);
    } else {
      setLoading(false);
      // Server error indicates that there is a connection error with copter
      const errorMessage = res?.error?.non_field_errors[0] === undefined ? "Server error" : res?.error?.non_field_errors[0];
      errorToaster(errorMessage);
    }
  };

  if (typeof window !== "undefined" && requestSent) {
    infoToaster("Please check your email inbox. We've sent you a link to reset your password.");
    router.push(routes.login);
  }

  return (
    <Layout
      title="Adzviser | Reset Password"
      content="Forgot your password? No worries. Reset your password now and regain access to your account. It only takes a few steps to get back to your account and continue enjoying our platform."
    >
      <div className="mx-auto auth__row">
        <div className="authSignup">
          <div className="authMain">
            <div className="authMain__title">
              <h2>Reset Password</h2>
              <p>
                Enter the email address associated with your account, and we&apos;ll
                send you a link to reset your password.
              </p>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <button
                className="authMain__button"
                style={{ background: Colors.Primary }}
                type="submit"
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
                  <> {"Reset Password"}</>
                )}
              </button>
            </form>
            <p className="mt-4 authMain__accountButton text-center">
              <Link href={routes.login}>Return to sign in</Link>
            </p>
          </div>
          <p className="mt-4 authMain__accountButton">
            Don&apos;t have an account?{" "}
            <Link href={routes.signup}>Sign up</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
