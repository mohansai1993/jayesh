import { SyntheticEvent } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Colors } from "../../../public/assets/colors";

interface ModalStyle {
  size?: "lg" | "xl" | "sm";
}
interface ModalPropsInterface extends ModalStyle {
  show: boolean;
  onHide?: () => void;
  onClick?: (e: SyntheticEvent) => void;
  children?: React.ReactNode;
  btnTitle?: string;
  btnType?: "button" | "submit" | "reset";
  isDisabled?: boolean;
}
const CustomModal = (props: ModalPropsInterface) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size={props.size || "lg"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* temporarily disable the X on the workspace creation page
      <div className="d-flex d-flex justify-content-end">
        <div className="close-icon" onClick={props.onHide}></div>
      </div>
      */}
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: Colors.Primary,
            borderColor: Colors.Primary,
          }}
          onClick={props.onClick}
          disabled={props.isDisabled}
        >
          {props.btnTitle || "Save"}
        </Button>
        <Button
          variant="outline-secondary"
          type={props?.btnType || "button"}
          onClick={props.onHide}
          disabled={props.isDisabled}
          className="modal--cancel__button"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
