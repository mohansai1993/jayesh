import Image from "next/image";
import images from "../../utils/images";
import Link from "next/link";
import { routes } from "../../utils";

const BannerSection = () => {
  return (
    <div className="banner container-fluid">
      <div className="row py-5 m-0">
        <div className="col-sm-12 col-md-5 my-auto order-lg-1 order-md-1 order-5">
          <h2 className="f-40">Easy to use and affordable <span className="fw-bold text-main">Supermetrics alternative</span> integrated with <Image src={images.chatgptCombo} alt="chatgpt img" /></h2>
          <p className="f-16 py-4 light-gray">Adzviser is your intelligent, user-friendly, and cost-effective data connector. Minimize your clicks and mouse movements, and effortlessly gain insights from your cross-platform data - no engineering skills required. Proudly designed and hosted in the US by a team of former Google engineers.</p>
          <Link href={routes.signup}><button className="btn btn-main px-5 py-2 f-14">Get Started</button></Link>
        </div>
        <div className="col-sm-12 col-md-7 col-12 px-lg-0 order-lg-2 order-md-2 order-1">
          <Image src={images.bannerbg} alt="banner img" className="w-100 h-sm-35" />
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
