import Header from '../../components/header';
import { AREAS, STORAGE_KEYS, VIEW_MODES } from '../../shared/constants';
import style from './style.scss';
import AreaMap from '../../components/area-map';
import FAB from '../../components/fab';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import { verifyUserIsLoggedIn } from '../../shared/auth-guard';

import MapIcon from 'mdi-preact/MapIcon';
import ListIcon from 'mdi-preact/FormatListBulletedIcon';
import ApiService from '../../shared/api-service';
import AreaList from '../../components/area-list';

const Area = ({ area }) => {
  // Protected route - user must be logged in
  useEffect(() => {
    verifyUserIsLoggedIn();
  }, [area]);

  const [mapView, setMapView] = useState(true);
  const [animals, setAnimals] = useState([]);

  // Fetch animals
  useEffect(() => {
    ApiService.fetchAnimals({ area }).then(setAnimals);
  }, [area]);

  // Retrive list|map mode from local storage
  useEffect(() => {
    const viewMode =
      window.localStorage.getItem(STORAGE_KEYS.viewMode) || VIEW_MODES.default;
    setMapView(viewMode === VIEW_MODES.map ? true : false);
  }, []);

  // Update map|list mode in local storage whenever it's updated in the UI
  useEffect(() => {
    const viewMode = mapView ? VIEW_MODES.map : VIEW_MODES.list;
    window.localStorage.setItem(STORAGE_KEYS.viewMode, viewMode);
  }, [mapView]);

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
          animals={animals}
          showAnimals={true}
          animalOnClick={animalOnClick}></AreaMap>
      ) : (
        <AreaList animals={animals} animalOnClick={animalOnClick}></AreaList>
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
