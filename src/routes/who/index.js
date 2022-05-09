import { useEffect, useState } from 'preact/hooks';
import FoodAppleIcon from 'mdi-preact/FoodAppleIcon';
import ExclamationIcon from 'mdi-preact/ExclamationIcon';
import LightbulbIcon from 'mdi-preact/LightbulbIcon';
import TeddyBearIcon from 'mdi-preact/TeddyBearIcon';

import Header from '../../components/header';
import ApiService from '../../shared/api-service';

import style from './style.scss';

const Who = ({ name }) => {
  const [animal, setAnimal] = useState({});

  useEffect(() => {
    ApiService.fetchAnimal({ name }).then((fetchedAnimal) => {
      console.log(fetchedAnimal);
      setAnimal(fetchedAnimal);
    });
  }, [name]);

  return (
    <div class={style.who}>
      <Header
        title={animal.name || name}
        backLink={`/area/${animal.area}`}
        mainColor={animal.dangerLevel}></Header>
      <div
        class={style.detailsWrapper}
        style={{ borderColor: animal.dangerLevel }}>
        <div class={style.details}>
          <div class={style.row}>
            <ExclamationIcon /> {animal.character}
          </div>
          <div class={style.row}>
            <FoodAppleIcon /> {animal.food?.join(', ')}
          </div>
          <div class={style.row}>
            <TeddyBearIcon /> {animal.enrichment}
          </div>
          <div class={style.row}>
            <LightbulbIcon /> {animal.about}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Who;
