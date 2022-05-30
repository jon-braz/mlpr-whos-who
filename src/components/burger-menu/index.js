import { useState } from 'preact/hooks';

import Burger from '../burger';
import Sidebar from '../sidebar';

const BurgerMenu = ({ ...props }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div {...props}>
      <Burger open={open} onClick={toggleOpen} />
      <Sidebar open={open} />
    </div>
  );
};

export default BurgerMenu;
