import { h } from 'preact';
import { Link } from 'preact-router';
import Header from '../../components/header';
import style from './style.scss';

const Home = () => (
  <div class={style.home}>
    <Header title={'Piggy Map'}></Header>
    <div class={style.map}>
      <Link href='/area/field' class={`${style.field} ${style.area}`}>
        <div>Field</div>
      </Link>
      <Link href='/area/yard' class={`${style.yard} ${style.area}`}>
        <div>Yard</div>
      </Link>
      <Link href='/area/redbarn' class={`${style.redBarn} ${style.area}`}>
        <div>Red Barn</div>
      </Link>
      <Link href='/area/bluebarn' class={`${style.blueBarn} ${style.area}`}>
        <div>Blue Barn</div>
      </Link>
      <Link href='/area/front' class={`${style.front} ${style.area}`}>
        <div>Front</div>
      </Link>
      <Link href='/area/oldfolks' class={`${style.oldFolks} ${style.area}`}>
        <div>Old Folks</div>
      </Link>
    </div>
  </div>
);

export default Home;
