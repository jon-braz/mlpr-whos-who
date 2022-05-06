import { h } from 'preact';
import { Link } from 'preact-router/match';
import { BackIcon } from '../icons';
import style from './style.scss';

const Header = ({ title, showBack }) => (
  <header class={style.header}>
    {showBack && (
      <Link href='/'>
        <BackIcon class={style.backIcon} />
      </Link>
    )}
    <h1>{title}</h1>
    {/* <nav>
      <Link activeClassName={style.active} href='/'>
        Home
      </Link>
      <Link activeClassName={style.active} href='/profile'>
        Me
      </Link>
      <Link activeClassName={style.active} href='/profile/john'>
        John
      </Link>
    </nav> */}
  </header>
);

export default Header;
