import { Link } from 'preact-router';
import style from './style.scss';

const Sidebar = ({ open }) => {
  return (
    <div class={`${style.sidebar} ${open ? style.open : null}`}>
      <Link href='/add'>Add Animal</Link>
      <Link href='/rehomed'>Rehomed Animals</Link>
      <Link href='/install'>Install App</Link>
    </div>
  );
};

export default Sidebar;
