import { route } from 'preact-router';
import Header from '../../components/header';
import OverallMap from '../../components/map';
import style from './style.scss';

import PigIcon from 'mdi-preact/PigIcon';
import { useEffect, useState } from 'preact/hooks';
import { verifyUserIsLoggedIn } from '../../shared/auth-guard';
import ViewToggle from '../../components/view-toggle';
import AnimalList from '../../components/animal-list';
import ApiService from '../../shared/api-service';
import { VIEW_MODES } from '../../shared/constants';
import Spinner from '../../components/spinner';

const navigateToArea = (area) => {
  route(`/area/${area}`);
};

const Home = () => {
  // Protected route - user must be logged in
  useEffect(() => {
    verifyUserIsLoggedIn();
  }, []);

  const [mapView, setMapView] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch animals
  useEffect(() => {
    if (!mapView) {
      setLoading(true);
      ApiService.fetchAnimals()
        .then(setAnimals)
        .then(() => setLoading(false));
    }
  }, [mapView]);

  // Route to animal on click
  const animalOnClick = (animal) => {
    route(`/who/${animal.id}`);
  };

  // Control map|list view
  const setView = (viewMode) => {
    setMapView(viewMode === VIEW_MODES.map ? true : false);
  };

  return (
    <div class={style.home}>
      <Header showMenu={true}>
        <PigIcon class={style.animalIcon} />
        <h1 class={style.title}>Piggy Map</h1>
      </Header>
      {mapView ? (
        <OverallMap onClick={navigateToArea} />
      ) : (
        <AnimalList
          animals={animals}
          animalOnClick={animalOnClick}></AnimalList>
      )}
      <ViewToggle setView={setView} mapView={mapView} />
      {loading ? (
        <div class={style.loadingSpinnerContainer}>
          <Spinner />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Home;
