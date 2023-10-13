import Image from "next/image";
import Link from "next/link";
import images from "../../utils/images";
import { routes } from "../../utils";
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
                  <ul className="dropdown-menu " style={{ width: "350px" }}>
                    <Link
                      href={routes.blog}
                      className=" text-decoration-none text-black hover:text-red"
                    >
                      <div style={{ margin: "0 24px" }}>
                        <p
                          style={{
                            fontWeight: "600",
                          }}
                        >
                          Blog
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#777",
                          }}
                        >
                          Stories about privacy, web analytics, and building a
                          financially sustainable open source project.
                        </p>
                      </div>
                    </Link>
                    <Link
                      href={routes.updates}
                      className=" text-decoration-none text-black hover:text-red"
                    >
                      <div style={{ margin: "0 24px" }}>
                        <p
                          style={{
                            fontWeight: "600",
                          }}
                        >
                          Updates
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#777",
                          }}
                        >
                          Stories about privacy, web analytics, and building a
                          financially sustainable open source project.
                        </p>
                      </div>
                    </Link>
                    <div
                      style={{
                        padding: " 24px",
                        background: "#f4f1f1",
                        fontSize: "14px",
                        color: "grey",
                        whiteSpace: "nowrap",
                        display: "flex",
                        textDecoration: "none",
                      }}
                    >
                      <span>Follow Us on</span>
                      <a
                        href="#"
                        style={{
                          fontSize: "14px",
                          display: "inline",
                          textDecoration: "none",
                          padding: "0 6px !important",
                        }}
                      >
                        Twitter
                      </a>
                      <span>or</span>
                      <a
                        href="#"
                        style={{
                          fontSize: "14px",
                          margin: "0",
                          display: "inline",
                          padding: "0 6px !important",
                          textDecoration: "none",
                        }}
                      >
                        Linkedin
                      </a>
                      <span>for more</span>
                    </div>
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
              <Link href={routes.login} className="btn f-14 text-main">
                Sign in
              </Link>
              <Link
                href={routes.signup}
                className="btn btn-main border-r-10 f-14"
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
