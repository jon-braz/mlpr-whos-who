import { useEffect, useState } from 'preact/hooks';

import FoodAppleIcon from 'mdi-preact/FoodAppleIcon';
import EmoticonIcon from 'mdi-preact/EmoticonIcon';
import EyeIcon from 'mdi-preact/EyeIcon';
import LightbulbIcon from 'mdi-preact/LightbulbIcon';
import TeddyBearIcon from 'mdi-preact/TeddyBearIcon';
import AlertIcon from 'mdi-preact/AlertIcon';
import ArmFlexIcon from 'mdi-preact/ArmFlexIcon';
import GroupIcon from 'mdi-preact/AccountGroupIcon';
import MedicationIcon from 'mdi-preact/PillIcon';

import Header from '../../components/header';
import ApiService from '../../shared/api-service';

import style from './style.scss';
import { Link } from 'preact-router';
import Button from '../../components/button';
import { verifyUserIsLoggedIn } from '../../shared/auth-guard';

const Who = ({ id }) => {
  const [animal, setAnimal] = useState({});
  const [groupedAnimals, setGroupedAnimals] = useState([]);

  // Protected route - user must be logged in
  useEffect(() => {
    verifyUserIsLoggedIn();
  }, [id]);

  useEffect(() => {
    ApiService.fetchAnimal({ id }).then(async (fetchedAnimal) => {
      setAnimal(fetchedAnimal);
      setGroupedAnimals(
        await ApiService.getGroupedAnimals({ animal: fetchedAnimal })
      );
    });
  }, [id]);

  const groupedAnimalLinks = groupedAnimals.map((animal) => (
    <Link href={`/who/${animal.id}`} class={style.groupedAnimalLink}>
      <Button style={{ backgroundColor: animal.dangerLevel }}>
        {animal.name}
      </Button>
    </Link>
  ));

  return (
    animal.name && (
      <div class={style.who}>
        <Header
          title={animal.name || ''}
          backLink={`/area/${animal.area}`}
          editLink={`/edit/${animal.id}`}
          className={animal.dangerLevel}></Header>
        <div class={`${style.detailsWrapper} ${style[animal.dangerLevel]}`}>
          <div class={style.details}>
            {animal.imagePath && (
              <img src={animal.imagePath} class={style.profileImage} />
            )}
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
            {animal.food?.length > 0 && (
              <div class={style.row}>
                <FoodAppleIcon /> {animal.food?.join(', ')}
              </div>
            )}
            {animal.enrichment && (
              <div class={style.row}>
                <TeddyBearIcon /> {animal.enrichment}
              </div>
            )}
            {animal.medication && (
              <div class={style.row}>
                <MedicationIcon /> {animal.medication}
              </div>
            )}
            {groupedAnimals?.length > 0 && (
              <div class={style.row}>
                <GroupIcon /> {groupedAnimalLinks}
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
