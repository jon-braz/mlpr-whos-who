import { useEffect, useState } from 'preact/hooks';
import style from './style.scss';

const AreaList = ({ animals, animalOnClick }) => {
  const [sortedAnimals, setSortedAnimals] = useState([]);

  useEffect(() => {
    const sorted = (animals || []).sort((a, b) => (a.name > b.name ? 1 : -1));
    setSortedAnimals(sorted);
  }, [animals]);

  const clickedAnimal = (animal) => (event) => {
    if (animalOnClick) {
      event.stopPropagation();
      animalOnClick(animal);
    }
  };

  const animalRows = (sortedAnimals || []).map((animal) => (
    <div onClick={clickedAnimal(animal)} class={style.animal}>
      <div class={style.col1}>
        <div class={`${style.dangerDot} ${style[animal.dangerLevel]}`}></div>
      </div>
      <div class={style.col2}>{animal.name}</div>
      <div class={style.col3}>{animal.food}</div>
      <div class={style.col4}>{animal.medication}</div>
    </div>
  ));

  return (
    <table class={style.animalList}>
      <div class={style.listHeader}>
        <div class={style.col1}></div>
        <div class={style.col2}>Name</div>
        <div class={style.col3}>Food</div>
        <div class={style.col4}>Medication</div>
      </div>
      {animalRows}
    </table>
  );
};

export default AreaList;
