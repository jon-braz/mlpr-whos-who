import { useRef } from 'preact/hooks';
import CloseIcon from 'mdi-preact/CloseIcon';
import style from './style.scss';

const Modal = ({ children, dismiss }) => {
  const self = useRef(null);

  const onContainerClick = (event) => {
    if (dismiss && event.target === self.current) {
      dismiss();
    }
  };

  const closeModal = (event) => {
    event.stopPropagation();
    dismiss?.();
  };

  return (
    <div class={style.modalContainer} onClick={onContainerClick} ref={self}>
      <div class={style.modalContent}>{children}</div>
      <button class={style.closeButton} onClick={closeModal}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default Modal;
