import Header from '../../components/header';
import { AREAS } from '../../shared/constants';
import style from './style.scss';
import AreaMap from '../../components/area-map';
import { route } from 'preact-router';

const Area = ({ area }) => {
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
        addLink={true}
      />
      <AreaMap
        area={area}
        showAnimals={true}
        animalOnClick={animalOnClick}
        allowRightClick={true}></AreaMap>
    </div>
  );
};

export default Area;
