import { Link } from 'preact-router/match';
import { BackIcon } from '../icons';
import PencilIcon from 'mdi-preact/PencilIcon';
import style from './style.scss';

const Header = ({ title, backLink, mainColor, editLink }) => {
  return (
    <header class={style.header} style={{ backgroundColor: mainColor }}>
      {backLink && (
        <Link href={backLink}>
          <BackIcon class={style.backIcon} />
        </Link>
      )}
      <h1>{title}</h1>
      {editLink && (
        <Link href={editLink} class={style.editLink}>
          <PencilIcon class={style.editIcon} />
        </Link>
      )}
    </header>
  );
};

export default Header;
