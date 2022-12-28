import Header from '../../components/header';
import { AREAS, STORAGE_KEYS, VIEW_MODES } from '../../shared/constants';
import style from './style.scss';
import AreaMap from '../../components/area-map';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import { verifyUserIsLoggedIn } from '../../shared/auth-guard';

import ApiService from '../../shared/api-service';
import AnimalList from '../../components/animal-list';
import ViewToggle from '../../components/view-toggle';

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

  const setView = (viewMode) => {
    setMapView(viewMode === VIEW_MODES.map ? true : false);
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
        <AnimalList
          animals={animals}
          animalOnClick={animalOnClick}></AnimalList>
      )}

      <ViewToggle mapView={mapView} setView={setView} />
    </div>
  );
};

export default Area;
