import style from './style.scss';

const FAB = ({ children, ...props }) => {
  return (
    <div class={style.fab} {...props}>
      {children}
    </div>
  );
};

export default FAB;
