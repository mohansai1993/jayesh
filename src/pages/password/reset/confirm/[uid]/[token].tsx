import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import Layout from "../../../../../hocs/layout";
import { Oval } from "react-loader-spinner";
import { resetPasswordConfirm } from "../../../../../actions/auth";
import { routes, errorToaster, successToaster } from "../../../../../utils";
import { useAuthReducer } from "../../../../../reducers/auth";
import { AppDispatch } from "../../../../../store";
import { Colors } from "../../../../../../public/assets/colors";
import { AiOutlineCheck } from "react-icons/ai";

const ResetPasswordConfirmPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { loading } = useAuthReducer();
  const { uid, token } = router.query;
  const [requestSent, setRequestSent] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;
  const onChange = (e: { target: HTMLInputElement }) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    if (new_password === re_new_password) {
      const res = await dispatch(
        resetPasswordConfirm(uid, token, new_password, re_new_password),
      );
      if (res?.new_password) {
        setResetPasswordError(res?.new_password);
        setLoading(false);
      }
      if (res?.success) {
        setRequestSent(true);
        setLoading(false);
      }
      if (res?.token) {
        setLoading(false);
        errorToaster("please check your email, Invalid token");
      }
    } else {
      setLoading(false);
      errorToaster("Confirm New Password is not matched.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && requestSent) {
      successToaster("Your password has been changed!");
      router.push(routes.index);
    }
  }, [requestSent]);

  return (
    <Layout
      title="Adzviser | Reset Password Confirm"
      content="Your password will be reset after you confirm your new password. Contact us if you have any issues resetting your password."
    >
      <div className="mx-auto auth__row">
        <div className="authSignup">
          <div className="authMain">
            <div className="authMain__title">
              <h2>Password Reset Confirm</h2>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className={"form-group  "}>
                <label htmlFor="new_password">New Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="new_password"
                  value={new_password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className={"form-group "}>
                <label htmlFor="re_new_password">Confirm New Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="re_new_password"
                  value={re_new_password}
                  onChange={(e) => onChange(e)}
                  required
                />
                <ul
                  style={{ marginTop: "12px", listStyle: "none" }}
                  className="validationErrorsList"
                >
                  {resetPasswordError.map((errorMessage, index) => {
                    return (
                      <li
                        key={errorMessage}
                        style={{
                          fontSize: "14px",
                          paddingTop: "4px",
                        }}
                      >
                        <AiOutlineCheck size={18} style={{ marginRight: 10 }} />{" "}
                        {errorMessage}
                      </li>
                    );
                  })}
                </ul>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPasswordConfirmPage;
