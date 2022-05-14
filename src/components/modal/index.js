import { useRef } from 'preact/hooks';
import style from './style.scss';

const Modal = ({ children, dismiss }) => {
  const self = useRef(null);

  const onContainerClick = (event) => {
    if (dismiss && event.target === self.current) {
      dismiss();
    }
  };

  return (
    <div class={style.modalContainer} onClick={onContainerClick} ref={self}>
      <div class={style.modalContent}>{children}</div>
    </div>
  );
};

export default Modal;
