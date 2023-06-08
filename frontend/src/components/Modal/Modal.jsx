//styles
import "./Modal.css";

const Modal = ({ message, setIsShow, action }) => {
  return (
    <>
      <div className="modal__mask"></div>
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
