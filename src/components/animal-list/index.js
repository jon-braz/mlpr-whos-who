import { useEffect, useState } from 'preact/hooks';
import { ANIMAL_PROPERTIES } from '../../shared/constants';
import style from './style.scss';

const AnimalList = ({ animals, animalOnClick }) => {
  const [sortedAnimals, setSortedAnimals] = useState([]);

  // Sort animals alphabetically by name
  useEffect(() => {
    const sorted = (animals || []).sort((a, b) => (a.name > b.name ? 1 : -1));
    setSortedAnimals(sorted);
  }, [animals]);

  // On click, pass action to parent
  const clickedAnimal = (animal) => (event) => {
    if (animalOnClick) {
      event.stopPropagation();
      animalOnClick(animal);
    }
  };

  // Map array of animals to each have a row in the list
  const animalRows = (sortedAnimals || []).map((animal) => (
    <div onClick={clickedAnimal(animal)} class={style.animal}>
      <div class={style.col1}>
        <div
          class={`${style.dangerDot} 
          ${style[animal[ANIMAL_PROPERTIES.dangerLevel]]}`}></div>
      </div>
      <div class={style.col2}>{animal[ANIMAL_PROPERTIES.name]}</div>
      <div class={style.col3}>{animal[ANIMAL_PROPERTIES.food]}</div>
      <div class={style.col4}>{animal[ANIMAL_PROPERTIES.medication]}</div>
      <div class={style.col5}>{animal[ANIMAL_PROPERTIES.enrichment]}</div>
    </div>
  ));

  return (
    <div class={style.animalList}>
      <div class={style.listHeader}>
        <div class={style.col1}></div>
        <div class={style.col2}>Name</div>
        <div class={style.col3}>Food</div>
        <div class={style.col4}>Medication</div>
        <div class={style.col5}>Enrichment</div>
      </div>
      {animalRows}
    </div>
  );
};

export default AnimalList;
