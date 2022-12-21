import Header from '../../components/header';
import { AREAS } from '../../shared/constants';
import style from './style.scss';
import AreaMap from '../../components/area-map';
import FAB from '../../components/fab';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import { verifyUserIsLoggedIn } from '../../shared/auth-guard';

import MapIcon from 'mdi-preact/MapIcon';
import ListIcon from 'mdi-preact/FormatListBulletedIcon';

const Area = ({ area }) => {
  // Protected route - user must be logged in
  useEffect(() => {
    verifyUserIsLoggedIn();
  }, [area]);

  const [mapView, setMapView] = useState(true);

  const areaTitle = AREAS[area].name;
  const areaColor = AREAS[area].color;

  const animalOnClick = (animal) => {
    route(`/who/${animal.id}`);
  };

  const viewMap = () => {
    setMapView(true);
  };

  const viewList = () => {
    setMapView(false);
  };

  return (
    <div class={style.area}>
      <Header
        title={areaTitle}
        backLink='/'
        backgroundColor={areaColor}
        showMenu={true}
      />
      {mapView ? (
        <AreaMap
          area={area}
          showAnimals={true}
          animalOnClick={animalOnClick}></AreaMap>
      ) : (
        <div>LIST</div>
      )}

      <FAB>
        <button
          onClick={viewMap}
          class={`${style.iconButton} ${mapView ? style.active : ''}`}>
          <MapIcon></MapIcon>
        </button>
        <button
          onClick={viewList}
          class={`${style.iconButton} ${mapView ? '' : style.active}`}>
          <ListIcon></ListIcon>
        </button>
      </FAB>
    </div>
  );
};

export default Area;
