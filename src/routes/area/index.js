import { useEffect, useState } from 'preact/hooks';
import { Link } from 'preact-router';

import Header from '../../components/header';
import ApiService from '../../shared/api-service';
import { AREAS } from '../../shared/constants';
import style from './style.scss';

const Area = ({ area }) => {
  const areaTitle = AREAS[area].name;
  const areaColor = AREAS[area].color;
  const [animals, updateAnimals] = useState([]);

  useEffect(() => {
    ApiService.fetchAnimals({ area }).then((fetchedAnimals) =>
      updateAnimals(fetchedAnimals)
    );
  }, [area]);

  const clicked = (event) => {
    const position = [
      event.offsetX / event.target.offsetWidth,
      event.offsetY / event.target.offsetHeight
    ];
    console.log(position.map((val) => Math.floor(val * 100)));
  };

  const animalIcons = animals.map((animal) => {
    const [x, y] = animal.location.map((percentage) => `${percentage}%`);

    return (
      <Link
        href={`/who/${animal.id}`}
        class={style.animal}
        style={{ top: y, left: x, backgroundColor: animal.color }}
        onClick={(event) => event.stopPropagation()}>
        {animal.name.charAt(0)}
      </Link>
    );
  });
  console.log(animalIcons);

  return (
    <div class={style.area}>
      <Header
        title={areaTitle}
        backLink='/'
        backgroundColor={AREAS[area].color}></Header>
      <div
        style={{ backgroundImage: `url(../../assets/areas/${area}.png)` }}
        class={style.map}
        onClick={clicked}>
        {animalIcons}
      </div>
    </div>
  );
};

export default Area;
