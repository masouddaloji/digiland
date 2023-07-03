import { useRef } from "react";
//hooks
import useOutsideClick from "../../hooks/useOutsideClick";
//styles
import "./Modal.css";

const Modal = ({ message, setIsShow, action }) => {
  const modalRef=useRef()
  useOutsideClick({ref:modalRef,setStateHandler:setIsShow})
  return (
    <>
      <div className="modal__mask" ref={modalRef}></div>
      <div className="modal">
        <p className="modal__title">{message}</p>
        <div className="modal__btnsBox">
          <button className="modal__btn noBtn" onClick={() => setIsShow(false)}>
            خیر
          </button>
          <button
            className="modal__btn yesBtn"
            onClick={() => {
              action();
              setIsShow(false);
            }}
          >
            بله
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
