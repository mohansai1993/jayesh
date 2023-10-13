import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../../../hocs/layout";
import { activate } from "../../../actions/auth";
import { AppDispatch } from "../../../store";

interface UserActivationEvent {
  event: string;
}

const ActivatePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { uid, token } = router.query;

  // Check if uid and token are defined before dispatching
  if (uid && token) {
    dispatch(activate(uid, token))
      .then(() => {
        // Makes sure that user_activation event is only pushed once
        if (
          !window.dataLayer.some(
            (event: UserActivationEvent) => event.event === "user_activation",
          )
        ) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "user_activation",
          });
        }
        window.location.href = "/login";
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

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
