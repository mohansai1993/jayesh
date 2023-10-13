import { CSSProperties } from "react";
import { Oval, ThreeDots } from "react-loader-spinner";
import { Colors } from "../../../public/assets/colors";

interface LoaderOptions {
  type: "Threedots" | "Oval";
}
interface LoaderProps extends LoaderOptions {
  style?: CSSProperties | undefined;
}

const Loader = (props: LoaderProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "40%",
        zIndex: 999,
        ...props?.style
      }}
    >
      {props?.type.toLowerCase() === "threedots" && (
        <ThreeDots color={Colors.Primary} width={50} height={50} />
      )}
      {props?.type.toLowerCase() === "oval" && (
        <Oval
          color={Colors.Primary}
          secondaryColor={Colors.Primary}
          width={50}
          height={50}
        />
      )}
    </div>
  );
};
export default Loader;
