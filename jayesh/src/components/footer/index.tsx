import Image from "next/image";
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";
import images from "../../utils/images";
import Link from "next/link";
import { routes } from "../../utils";

const Footer = () => {
  return (
    <div className='footer py-110'>
      <div className='row m-0 px-md-100 px-sm-3'>
        <div className="col-md-3 col-sm-12 pe-0 mb-4">
          <Image src={images.adzviserLogo} className="footerLogo" alt="Adzviser Logo" />
          <p className="f-14 regular-font pt-4 ligter-gray">Made and hosted in the US 🇺🇸
            <br />
            Solely funded by our subscribers.
          </p>
          <hr className="hr-bar" />
          <span className="f-14 regular-font text-white">© Adzviser LLC 2023</span>
        </div>
        <div className="col-md-3 col-sm-12 mb-4">
          <h3 className="ligth-gray mb-4 f-16">Company</h3>
          <a href="#product" className="nav-link text-white pb-3 regular-font f-15">Product</a>
          <a href={routes.tutorial} className="nav-link text-white pb-3 regular-font f-15">Tutorial</a>
          <a href="#price" className="nav-link text-white pb-3 regular-font f-15">Pricing</a>
          <a href="#connections" className="nav-link text-white pb-3 regular-font f-15">Connections</a>
        </div>
        <div className="col-md-3 col-sm-12 mb-4">
          <h3 className="ligth-gray mb-4 f-16">Resources</h3>
          <Link href={routes.privacy} className="nav-link text-white pb-3 regular-font f-15">Privacy Policy</Link>
          <Link href={routes.terms} className="nav-link text-white pb-3 regular-font f-15">Terms and Conditions</Link>
          <Link href={routes.refund} className="nav-link text-white pb-3 regular-font f-15">Refund Policy</Link> 
        </div>
        <div className="col-md-2 col-sm-12 mb-4">
          <h3 className="ligth-gray mb-4 f-16">Follow Us</h3>
          <a href="https://www.facebook.com/adzviser" className="pe-4 text-white pb-3 regular-font f-15"><BsFacebook /></a>
          {/*<a href="/" className="pe-4 text-white pb-3 regular-font f-15"><BsTwitter/></a>*/}
          <a href="https://www.instagram.com/adzviser/" className="pe-4 text-white pb-3 regular-font f-15"><BsInstagram /></a>
          <a href="https://www.linkedin.com/company/adzviser" className="pe-4 text-white pb-3 regular-font f-15"><BsLinkedin /></a>
        </div>
      </div>
    </div>
  );
};
export default Footer;
