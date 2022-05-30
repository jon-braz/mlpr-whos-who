import style from './style.scss';

const Burger = ({ open, ...props }) => {
  return (
    <div class={`${style.burger} ${open ? style.open : null}`} {...props}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default Burger;
