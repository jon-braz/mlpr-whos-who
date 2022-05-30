import { route } from 'preact-router';
import style from './style.scss';

const Button = ({ children, href, onClick, ...props }) => {
  const btnClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      route(href);
    }
  };
  return (
    <button class={style.button} onClick={btnClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
