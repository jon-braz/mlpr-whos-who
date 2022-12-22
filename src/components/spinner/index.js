import style from './style.scss';

const Spinner = ({ ...props }) => {
  return <span class={style.spinner} {...props}></span>;
};

export default Spinner;
