import { Link } from 'preact-router/match';
import { BackIcon } from '../icons';
import style from './style.scss';

const Header = ({ title, backLink, mainColor }) => {
  return (
    <header class={style.header} style={{ backgroundColor: mainColor }}>
      {backLink && (
        <Link href={backLink}>
          <BackIcon class={style.backIcon} />
        </Link>
      )}
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
