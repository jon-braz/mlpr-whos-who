import { Link } from 'preact-router';

import { auth } from '../../shared/firebase';
import style from './style.scss';

const Sidebar = ({ open }) => {
  const loggedIn = !!auth.currentUser;

  return (
    <div class={`${style.sidebar} ${open ? style.open : null}`}>
      <Link href='/'>Home</Link>
      <Link href='/add'>Add Animal</Link>
      <Link href='/rehomed'>Rehomed Animals</Link>
      <Link href='/install'>Install App</Link>
      {loggedIn ? <Link href='/videos'>Videos</Link> : ''}
      {loggedIn ? (
        <Link href='/logout'>Sign Out</Link>
      ) : (
        <Link href='/login'>Login</Link>
      )}
    </div>
  );
};

export default Sidebar;
