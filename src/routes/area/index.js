import Header from '../../components/header';
import { AREAS } from '../../shared/constants';
import style from './style.scss';
import AreaMap from '../../components/area-map';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { verifyUserIsLoggedIn } from '../../shared/auth-guard';

const Area = ({ area }) => {
  // Protected route - user must be logged in
  useEffect(() => {
    verifyUserIsLoggedIn();
  }, [area]);

  const areaTitle = AREAS[area].name;
  const areaColor = AREAS[area].color;

  const animalOnClick = (animal) => {
    route(`/who/${animal.id}`);
  };

  return (
    <div class={style.area}>
      <Header
        title={areaTitle}
        backLink='/'
        backgroundColor={areaColor}
        showMenu={true}
      />
      <AreaMap
        area={area}
        showAnimals={true}
        animalOnClick={animalOnClick}></AreaMap>
    </div>
  );
};

export default Area;
