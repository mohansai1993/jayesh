import { Dispatch, SetStateAction, useCallback } from "react";
import { Button, Modal } from "react-bootstrap";
import { Colors } from "../../../public/assets/colors";
import Image from "next/image";
import images from "../../utils/images";


interface PopupMessageInterface {
  isVisiblePopupMessage: boolean;
  btnTitle?: string;
  setVisiblePopupMessage: Dispatch<SetStateAction<boolean>>;
  popupMessageBtnHandler: () => void;
  isDangerBtn?: boolean;
  popupMessage:string
}

const PopupMessage: React.FC<PopupMessageInterface> = ({
  isVisiblePopupMessage,
  btnTitle,
  setVisiblePopupMessage,
  popupMessageBtnHandler,
  popupMessage
}) => {
  return (
    <Modal
      show={isVisiblePopupMessage}
      onHide={useCallback(() => {
        setVisiblePopupMessage(false);
      }, [])}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Button
        variant="outline-secondary"
        type={"button"}
        style={{width: "40%",}}
        onClick={useCallback(() => {
          setVisiblePopupMessage(false);
        }, [])}
        className="closeBtn"
      >
        <Image src={images.closeIcon} alt="" />
      </Button>
      <Modal.Body style={{paddingTop:30}}>
        <h5 style={{ textAlign: "center" }} className="mt-4 f-16 px-5 popup-text">
          {popupMessage}
        </h5>
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          style={{
            backgroundColor: Colors.Primary,
            borderColor: Colors.Primary,
            width: "40%",
          }}
          onClick={popupMessageBtnHandler}
        >
          {btnTitle || "Save"}
        </Button>
        <Button
          variant="outline-secondary"
          type={"button"}
          style={{width: "40%",}}
          onClick={useCallback(() => {
            setVisiblePopupMessage(false);
          }, [])}
          className="modal--cancel__button"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default PopupMessage;