import { useEffect, useState } from 'preact/hooks';

import FoodAppleIcon from 'mdi-preact/FoodAppleIcon';
import EmoticonIcon from 'mdi-preact/EmoticonIcon';
import EyeIcon from 'mdi-preact/EyeIcon';
import LightbulbIcon from 'mdi-preact/LightbulbIcon';
import TeddyBearIcon from 'mdi-preact/TeddyBearIcon';
import AlertIcon from 'mdi-preact/AlertIcon';
import ArmFlexIcon from 'mdi-preact/ArmFlexIcon';

import Header from '../../components/header';
import ApiService from '../../shared/api-service';

import style from './style.scss';

const Who = ({ name }) => {
  const [animal, setAnimal] = useState({});

  const styles = getComputedStyle(document.documentElement);

  useEffect(() => {
    ApiService.fetchAnimal({ name }).then((fetchedAnimal) => {
      console.log(fetchedAnimal);
      setAnimal(fetchedAnimal);
    });
  }, [name]);

  return (
    animal.name && (
      <div class={style.who}>
        <Header
          title={animal.name || name}
          backLink={`/area/${animal.area}`}
          editLink={`/edit/${animal.id}`}
          className={animal.dangerLevel}></Header>
        <div class={`${style.detailsWrapper} ${style[animal.dangerLevel]}`}>
          <div class={style.details}>
            {animal.dangerReason && (
              <div
                class={`${style.row} ${
                  animal.dangerLevel === 'orange'
                    ? style.dangerOrange
                    : style.dangerRed
                }`}>
                <AlertIcon /> {animal.dangerReason}
              </div>
            )}
            {animal.imagePath && (
              <img src={animal.imagePath} class={style.profileImage} />
            )}
            {animal.character && (
              <div class={style.row}>
                <EmoticonIcon /> {animal.character}
              </div>
            )}
            <div class={style.row}>
              <ArmFlexIcon /> {animal.dominant ? 'Dominant' : 'Submissive'}
            </div>
            {animal.howToIdentify && (
              <div class={style.row}>
                <EyeIcon /> {animal.howToIdentify}
              </div>
            )}
            {animal.food && (
              <div class={style.row}>
                <FoodAppleIcon /> {animal.food?.join(', ')}
              </div>
            )}
            {animal.enrichment && (
              <div class={style.row}>
                <TeddyBearIcon /> {animal.enrichment}
              </div>
            )}
            {animal.about && (
              <div class={style.row}>
                <LightbulbIcon /> {animal.about}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Who;