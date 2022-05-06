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
    {/* <img
      src='../../assets/areas/overview.png'
      usemap='#image-map'
      class={style.map}
    />
    <map name='image-map'>
      <area
        target=''
        alt='Red Barn'
        title='Red Barn'
        href='/area/redbarn'
        coords='0,476,82,759'
        shape='rect'
      />
      <area
        target=''
        alt='Field'
        title='Field'
        href='/area/field'
        coords='3,284,434,-1'
        shape='rect'
      />
      <area
        target=''
        alt='Yard'
        title='Yard'
        href='/area/yard'
        coords='7,462,247,299'
        shape='rect'
      />
      <area
        target=''
        alt='Blue Barn'
        title='Blue Barn'
        href='/area/bluebarn'
        coords='340,488,422,763'
        shape='rect'
      />
      <area
        target=''
        alt='Front'
        title='Front'
        href='/area/front'
        coords='86,761,325,480'
        shape='rect'
      />
      <area
        target=''
        alt='Old Folks Block'
        title='Old Folks Block'
        href='/area/oldfolks'
        coords='267,297,422,465'
        shape='rect'
      />
    </map> */}
  </div>
);

export default Home;
