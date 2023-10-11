import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../../hocs/layout";
import { activate } from "../../../actions/auth";
import { AppDispatch } from "../../../store";

const ActivatePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { uid, token } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(activate(uid, token));
        // Makes sure that user_activation event is only pushed once
        if (
          typeof window !== "undefined" &&
          !window.dataLayer.some((event) => event.event === "user_activation")
        ) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "user_activation",
          });
        }
        router.push("/login");
      } catch (error) {
        console.log(error);
        // Handle error, show user a message, etc.
      }
    };

    fetchData();
  }, [dispatch, router, uid, token]);

  return (
    <Layout
      title="Adzviser | New User Activation"
      content="Adzviser is activating your account now. Congratulations! Your account has been successfully created. Welcome to Adzviser."
    >
      <div className="activePage mx-auto">
        <h1 style={{ padding: 20 }}>
          Your account is activated now. Please login to continue.
        </h1>
      </div>
    </Layout>
  );
};

export default ActivatePage;
