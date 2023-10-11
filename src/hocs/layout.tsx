import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthReducer } from "reducers/auth";
import { loadUser } from "../actions/auth";
import Navbar from "../components/navbar";
import { AppDispatch } from "../store";
import { routes } from "utils";
import Link from "next/link";

interface LayoutInterface {
  title: string;
  content: string;
  children: React.ReactNode;
  isAuthRequired?: boolean;
}
const Layout = ({
  title,
  content,
  children,
  isAuthRequired = true,
}: LayoutInterface) => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useAuthReducer();

  const userAuthentication = () => {
    dispatch(loadUser());
  };
  useEffect(() => {
    // if user is not authenticated and auth required
    isAuthRequired && !user && userAuthentication();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>

      <div className="pb-4">
        <Navbar />
      </div>
      <div className="containter">{children}</div>
      <span className="ps-4 f-16 text-gray medium-font d-flex footerBar">
        © Adzviser LLC ·
        <Link href={routes.privacy} className="nav-link p-0 px-1">
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link href={routes.terms} className="nav-link p-0 px-1">
          Terms & Conditions
        </Link>
      </span>
    </>
  );
};

Layout.defaultProps = {
  title: "Adzviser",
  content: "A search bar gateway to your marketing data",
};

export default Layout;
