import { useEffect, useState } from 'preact/hooks';
import ApiService from '../../shared/api-service';
import style from './style.scss';

const AreaMap = ({ area, onClick, animalOnClick, showAnimals }) => {
  const [animals, updateAnimals] = useState([]);

  useEffect(() => {
    if (showAnimals) {
      ApiService.fetchAnimals({ area }).then((fetchedAnimals) =>
        updateAnimals(fetchedAnimals)
      );
    }
  }, [area]);

  const clicked = (event) => {
    const position = [
      Math.floor((event.offsetX / event.target.offsetWidth) * 100),
      Math.floor((event.offsetY / event.target.offsetHeight) * 100)
    ];
    onClick?.(position);
  };

  const clickedAnimal = (animal) => (event) => {
    if (animalOnClick) {
      event.stopPropagation();
      animalOnClick(animal);
    }
  };

  const animalIcons = showAnimals
    ? animals.map((animal) => {
        const [x, y] = animal.location.map((percentage) => `${percentage}%`);

        return (
          <div
            class={`${style.animal} ${animalOnClick ? style.clickable : null}`}
            style={{ top: y, left: x, backgroundColor: animal.color }}
            onClick={clickedAnimal(animal)}>
            {animal.name.charAt(0)}
          </div>
        );
      })
    : null;

  return (
    <div
      style={{ backgroundImage: `url(../../assets/areas/${area}.png)` }}
      class={`${style.map} ${onClick ? style.clickable : null}`}
      onClick={clicked}>
      {animalIcons}
    </div>
  );
};

export default AreaMap;
