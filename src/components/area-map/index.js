import { useEffect, useState } from 'preact/hooks';
import { buildLocationMap } from '../../shared/helpers';
import style from './style.scss';

const AreaMap = ({ area, animals, onClick, animalOnClick, showAnimals }) => {
  const [locationMap, setLocationMap] = useState({});

  useEffect(() => {
    if (showAnimals) {
      const locMap = buildLocationMap(animals);
      setLocationMap(locMap);

      const clearAnimals = () => {
        setLocationMap({});
      };

      return clearAnimals;
    }
  }, [area, animals]);

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
        let [rawX, rawY] = group[0].location;
        if (rawX + group.length * 4 > 100) {
          rawX -= group.length * 2;
        }
        const [x, y] = [rawX, rawY].map((percentage) => `${percentage}%`);

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
