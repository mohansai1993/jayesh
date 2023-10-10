import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { Colors } from "../../public/assets/colors";
import { login } from "../actions/auth";
import Layout from "../hocs/layout";
import { AppDispatch } from "../store";
import { errorToaster, routes } from "../utils";
import images from "../utils/images";

const AuthorizePage = () => {
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [authCode, setAuthCode] = useState("");
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const { email, password } = formData;
    const { redirect_uri, state } = router.query;

    const onChange = (e: { target: HTMLInputElement }) =>
        setFormData({ ...formData, [e.target.name]: e?.target?.value });

    const onSubmit = async (e: SyntheticEvent) => {
        setLoading(true);
        e.preventDefault();
        const res = await dispatch(login(email, password));
        if (res.success) {
            setAuthenticated(true);
            setAuthCode(res.authCode);
            setLoading(false);
        }
        if (res?.error) {
            setLoading(false);
            errorToaster("Incorrect email or password.");
        }
    };

    useEffect(() => {
        if (authenticated) {
            window.location.href = `${redirect_uri}?code=${authCode}&state=${state}`;
        }
    }, [authenticated, authCode, redirect_uri]);


    return (
        <Layout
            title="Adzviser | Authorize"
            content="Authorize Your Account for ChatGPT Access. By completing this process, you will grant ChatGPT access to Adzviser's comprehensive marketing data search engine."
            isAuthRequired={false}
        >
            <div className="mx-auto auth__row">
                <div className="authSignup">
                    <div className="authMain">
                        <div className="authMain__title text-center">
                            <h2 className="medium-font">Authorize <span className="text-adzviser bold-font">ChatGPT</span></h2>
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
                            <div className={"form-group"}   >

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
                                    src={passwordType === "password" ? images.hideeyeIcon : images.eyeIcon}
                                    style={{ height: "100%" }}
                                    priority={true}
                                />
                            </div>
                            <div className="form-group__password text-end">

                                <Link href={routes.resetPassword} className="tin-font f-16">Forgot Password?</Link>
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
                                    <>{"Click to Authorize"}</>
                                )}
                            </button>
                        </form>
                        <p className="authMain__accountButton mt-30 text-gray f-16 regular-font text-center">
                            Don&apos;t have an account?{" "}
                            <Link href={routes.signup} className="bold-font">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AuthorizePage;
