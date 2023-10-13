import React, { Fragment } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Head from "next/head";

interface MainLayoutInterface {
  title: string;
  content: string;
  children: React.ReactNode;
}

const MainLayout = ({ title, content, children }: MainLayoutInterface) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <Header />
      <div>{children}</div>
      <Footer />
    </Fragment>
  );
};
export default MainLayout;
