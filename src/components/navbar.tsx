import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Colors } from "../../public/assets/colors";
import { logout } from "../actions/auth";

import { useAuthReducer } from "../reducers/auth";

import { AppDispatch } from "../store";
import { routes } from "../utils";
import images from "../utils/images";
import { Button } from "react-bootstrap";
import { openModal } from "actions/modal";



const Navbar = () => {

  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuthReducer();


  const router = useRouter();

  const logoutHandler = async () => {
    await dispatch(logout());
    router.push(routes.login);
  };

  const openSubscriptionHandler = () => {
    dispatch(openModal());
  };



  const guestLinks = () => (
    <>
      <li className="nav-item customNavItem">
        <Link
          className={
            router.pathname === "/login" ? "nav-link btn-primary f-13 round-10 border-0 all-center" : "nav-link f-13"
          }
          href={routes.login}
          style={{ color: Colors.Primary, fontWeight: "400" }}
        >
          Sign in
        </Link>
      </li>

      <li className="nav-item customNavItem">
        <Link
          className={
            router.pathname === "/login"
              ? "nav-link f-13" : "nav-link btn-primary f-13 round-10 border-0 all-center"
          }
          href={routes.signup}
          style={{}}
        >
          Sign up
        </Link>

      </li>

    </>
  );

  const authLinks = () => (
    <>
      <li className="nav-item customNavItem">
        <Button
          onClick={() => openSubscriptionHandler()}
          className={"trials-button"}
          style={{}}
        >
          🛒 Subscription Plan
        </Button>
      </li>
      <li className="nav-item customNavItem logoutBtn">
        <a
          className="nav-link"
          href="#!"
          style={{ fontWeight: "400" }}
          onClick={logoutHandler}
        >
          <Image src={images.logoutIcon} alt="" className="me-2" />
          Logout
        </a>
      </li>
    </>
  );
  return (
    <>
      <nav className="navbar navbar-expand-lg navbarMobile box-shadow py-2">
        <div className="container-fluid">
          <Link
            href={routes.index}
            className={
              router.pathname === routes.index ? "nav-link active" : "nav-link"
            }
          >
            <Image
              alt="Brand Logo Image"
              src={images.brandLogo}
              priority={true}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {user !== null && router.pathname === "/set-up" ? authLinks() : guestLinks()}
            </ul>
          </div>
        </div>
      </nav>
      <nav
        className="navbar navbar-expand-lg navbarDesktop box-shadow py-3 bg-white px-2"
      >
        <div className="container-fluid">
          <div style={{ width: "100%", display: "flex" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link
                href={routes.index}
                className={
                  router.pathname === routes.index
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <Image
                  alt="Login Image"
                  src={images.brandLogo}
                  style={{ width: "225px", objectFit: "cover" }}
                />
              </Link>
              <div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  style={{ justifyContent: "end", width: "100%" }}
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav  mb-2 mb-lg-0">
                    {user !== null && (router.pathname === "/set-up") ? authLinks() : guestLinks()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;



// <div> <span @click="open = !open" class="cursor-pointer inline-flex justify-center font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"> Community <svg class="-mr-1 h-5 w-5" style="transform: translateY(3px);" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path> </svg> </span> </div>