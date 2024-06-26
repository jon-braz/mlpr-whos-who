import { Link } from 'preact-router/match';
import { BackIcon } from '../icons';
import PencilIcon from 'mdi-preact/PencilIcon';
import AddIcon from 'mdi-preact/AddIcon';
import style from './style.scss';
import BurgerMenu from '../burger-menu';

const Header = ({
  title,
  backLink,
  mainColor,
  editLink,
  addLink,
  showMenu,
  className,
  children
}) => {
  return (
    <header
      class={`${style.header} ${style[className]}`}
      style={{ backgroundColor: mainColor }}>
      {backLink && (
        <Link href={backLink}>
          <BackIcon class={style.backIcon} />
        </Link>
      )}
      {children || <h1>{title}</h1>}
      {editLink && (
        <Link href={editLink} class={style.editLink}>
          <PencilIcon class={style.editIcon} />
        </Link>
      )}
      {addLink && (
        <Link href='/add' class={style.editLink}>
          <AddIcon class={style.editIcon}></AddIcon>
        </Link>
      )}
      {showMenu && <BurgerMenu class={style.burgerMenu}></BurgerMenu>}
    </header>
  );
};

export default Header;
