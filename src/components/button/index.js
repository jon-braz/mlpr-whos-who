import style from './style.scss';

const Button = ({ children, ...props }) => (
  <button class={style.button} {...props}>
    {children}
  </button>
);

export default Button;
