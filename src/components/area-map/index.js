import { useEffect, useState } from 'preact/hooks';
import ApiService from '../../shared/api-service';
import style from './style.scss';

let locationMap = {};

const AreaMap = ({ area, onClick, animalOnClick, showAnimals }) => {
  const [animals, updateAnimals] = useState([]);

  useEffect(() => {
    if (showAnimals) {
      ApiService.fetchAnimals({ area }).then((fetchedAnimals) => {
        locationMap = fetchedAnimals.reduce((map, animal) => {
          const locationString = animal.location.join('');
          const animalsAtLocation = map[locationString] || [];
          map[locationString] = [...animalsAtLocation, animal];
          return map;
        }, {});
        updateAnimals(fetchedAnimals);
      });
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

  const AnimalIcon = ({ animal }) => (
    <div
      class={`
      ${style.animal} 
      ${animalOnClick ? style.clickable : null} 
      ${style[animal.dangerLevel]}`}
      onClick={clickedAnimal(animal)}>
      {animal.name.charAt(0)}
    </div>
  );

  const animalGroupIcons = showAnimals
    ? Object.values(locationMap).map((group) => {
        const [x, y] = group[0].location.map((percentage) => `${percentage}%`);

        return (
          <div
            class={`${style.animalGroup} ${
              group.length > 1 ? style.multiple : null
            }`}
            style={{ top: y, left: x }}>
            {group.map((animal) => (
              <AnimalIcon animal={animal} />
            ))}
          </div>
        );
      })
    : null;

  return (
    <div
      style={{ backgroundImage: `url(../../assets/areas/${area}.jpg)` }}
      class={`${style.map} ${onClick ? style.clickable : null}`}
      onClick={clicked}>
      {animalGroupIcons}
    </div>
  );
};

export default AreaMap;
