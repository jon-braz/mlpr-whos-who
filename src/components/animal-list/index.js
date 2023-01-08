import { useEffect, useState } from 'preact/hooks';
import { ANIMAL_PROPERTIES } from '../../shared/constants';
import { buildLocationMap, getColocatedAnimals } from '../../shared/helpers';
import Button from '../button';
import style from './style.scss';

const AnimalList = ({ animals, animalOnClick }) => {
  const [sortedAnimals, setSortedAnimals] = useState([]);
  const [locationMap, setLocationMap] = useState({});
  const [highlightedAnimalId, setHighlightedAnimalId] = useState(null);

  // Sort animals alphabetically by name
  useEffect(() => {
    const sorted = (animals || []).sort((a, b) => (a.name > b.name ? 1 : -1));
    setSortedAnimals(sorted);
  }, [animals]);

  useEffect(() => {
    const locMap = buildLocationMap(animals);
    setLocationMap(locMap);

    const clearAnimals = () => {
      setLocationMap({});
    };

    return clearAnimals;
  }, [animals]);

  // On click, pass action to parent
  const clickedAnimal = (animal) => (event) => {
    if (animalOnClick) {
      event.stopPropagation();
      animalOnClick(animal);
    }
  };

  const highlightAnimal = (animal) => (event) => {
    event.stopPropagation();
    const animalElement = document.getElementById(`animal-${animal.id}`);
    setHighlightedAnimalId(animal.id);
    animalElement.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => setHighlightedAnimalId(null), 1000);
  };

  // Map array of animals to each have a row in the list
  const animalRows = (sortedAnimals || []).map((animal) => {
    const colocatedAnimals = getColocatedAnimals(animal, locationMap);
    const colocButtons = colocatedAnimals.map((coloc) => (
      <div class={style.locWithWrapper}>
        <Button
          style={{ backgroundColor: coloc.dangerLevel }}
          onClick={highlightAnimal(coloc)}>
          {coloc.name}
        </Button>
      </div>
    ));

    const highlighted = highlightedAnimalId === animal.id;

    return (
      <div
        onClick={clickedAnimal(animal)}
        class={`${style.animal} ${highlighted ? style.highlighted : ''}`}>
        <div class={style.col1}>
          <div
            class={`${style.dangerDot} 
          ${style[animal[ANIMAL_PROPERTIES.dangerLevel]]}`}></div>
        </div>
        <div class={style.col2} id={`animal-${animal.id}`}>
          {animal[ANIMAL_PROPERTIES.name]}
        </div>
        <div class={style.col3}>{animal[ANIMAL_PROPERTIES.food]}</div>
        <div class={style.col4}>{animal[ANIMAL_PROPERTIES.medication]}</div>
        <div class={style.col5}>{animal[ANIMAL_PROPERTIES.enrichment]}</div>
        <div class={style.col6}>{colocButtons}</div>
      </div>
    );
  });

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
