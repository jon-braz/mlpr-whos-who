import Header from '../../components/header';
import { areaNames } from '../../shared/constants';
import style from './style.scss';

const Area = ({ area }) => {
  const areaTitle = areaNames[area];

  const clicked = (event) => {
    const position = [
      event.offsetX / event.target.offsetWidth,
      event.offsetY / event.target.offsetHeight
    ];
    console.log(position.map((val) => Math.floor(val * 100)));
  };

  return (
    <div class={style.area}>
      <Header title={areaTitle} showBack={true}></Header>
      <div
        style={{ backgroundImage: `url(../../assets/areas/${area}.png)` }}
        class={style.map}
        onClick={clicked}
      />
    </div>
  );
};

export default Area;
