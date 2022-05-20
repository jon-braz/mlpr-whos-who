import { route } from 'preact-router';
import Header from '../../components/header';
import OverallMap from '../../components/map';
import style from './style.scss';

const navigateToArea = (area) => {
  route(`/area/${area}`);
};

const Home = () => (
  <div class={style.home}>
    <Header addLink={true}>
      <h1 class={style.title}>Piggy Map</h1>
    </Header>
    <OverallMap onClick={navigateToArea} />
  </div>
);

export default Home;
