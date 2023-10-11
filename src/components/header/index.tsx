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
                <a
                  className="nav-link active text-main medium-font"
                  aria-current="page"
                  href="#"
                >
                  Product
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={routes.tutorial}>
                  Tutorial
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#price">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <Link href={routes.contactUs} className="nav-link">
                  Contact us
                </Link>
              </li>
              <li>
                <DropdownButton
                  id="dropdown-basic-button"
                  variant="white"
                  className={styles.dropdown}
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    outline: "none",
                  }}
                  title="Community"
                >
                  <Dropdown.Item href={routes.blog}>Blog</Dropdown.Item>
                  <Dropdown.Item href={routes.updates}>Updates</Dropdown.Item>
                </DropdownButton>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#connections">
                  Connections
                </a>
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
