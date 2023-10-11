import Image from "next/image";
import Link from "next/link";
import images from "../../utils/images";
import { routes } from "../../utils";
import { Dropdown, DropdownButton } from "react-bootstrap";
import styles from "../../styles/Dropdown.module.css";
const Header = () => {
  return (
    <div className="mainNav">
      <nav className="navbar navbar-expand-lg bg-white p-4">
        <div className="container-fluid">
          <Link href={routes.index} className="navbar-brand">
            <Image alt="Brand Image" src={images.brandLogo} priority={true} />
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
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 flex items-center">
              <li className="nav-item">
                <Link
                  className="nav-link active text-main medium-font"
                  aria-current="page"
                  href="#"
                >
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={routes.tutorial}>
                  Tutorial
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#price">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link href={routes.contactUs} className="nav-link">
                  Contact us
                </Link>
              </li>
              <li>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle p-0 border border-0 "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      color: "rgba(0,0,0,0.55)",
                      fontWeight: "100",
                    }}
                  >
                    Community
                  </button>
                  <ul className="dropdown-menu">
                    <Link
                      className="dropdown-item"
                      href="/blog"
                      style={{
                        color: "rgba(0,0,0,0.55)",
                        fontWeight: "100",
                      }}
                    >
                      Blog
                    </Link>
                    <Link
                      className="dropdown-item"
                      href="/updates"
                      style={{
                        color: "rgba(0,0,0,0.55)",
                        fontWeight: "100",
                      }}
                    >
                      Updates
                    </Link>
                    <Link
                      className="dropdown-item"
                      href="#"
                      style={{
                        color: "rgba(0,0,0,0.55)",
                        fontWeight: "100",
                      }}
                    >
                      Social Media
                    </Link>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#connections">
                  Connections
                </Link>
              </li>
            </ul>
            <div className="headerBtn d-flex gap-2">
              <Link href={routes.login} className="btn f-13 text-main">
                Sign in
              </Link>
              <Link
                href={routes.signup}
                className="btn btn-main border-r-10 f-13"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
