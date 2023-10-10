import Image from "next/image";
import images from "../../utils/images";
import Link from "next/link";
import { routes } from "../../utils";

const ActionSection = () => {
  return (
    <div className="action py-0">
      <div className="row m-0 px-md-100 px-sm-3 py-lg-0 py-md-0 py-5">
        <div className="col-md-6 col-sm-12 order-lg-1 order-md-1 order-5">
          <h3 className="f-40 text-white">Sign Up for Free</h3>
          <p className="f-14 regular-font text-white py-4">Experience the future of marketing analytics by signing up today. Explore all our features without any commitment or credit card required, and see firsthand how they can empower you to achieve your goals. Join us now!</p>
          <Link href={routes.signup}>
            <button className="btn f-14 py-2 bg-white text-main px-5">Sign up</button>
          </Link>
        </div>
        <div className="col-md-6 col-sm-12 order-lg-2 order-md-2 order-1">
          <Image 
            src={images.actionbg} 
            className="w-100" 
            alt="Marketing Analytics"
            width={500}  // set a specific width for the image
            height={300}  // adjust height as per your requirements
          />
        </div>
      </div>
    </div>
  );
};
export default ActionSection;
