import { useEffect, useState } from 'preact/hooks';
import {
  ContextMenuWithData,
  MenuItem,
  openContextMenu
} from 'preact-context-menu';

import Button from '../button';
import Modal from '../modal';
import ApiService from '../../shared/api-service';
import style from './style.scss';
import OverallMap from '../map';

let locationMap = {};

const AreaMap = ({
  area,
  onClick,
  animalOnClick,
  showAnimals,
  allowRightClick
}) => {
  const [animals, updateAnimals] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [showArea, setShowArea] = useState(null);
  const [groupBeingMoved, setGroupBeingMoved] = useState(null);

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

      const clearAnimals = () => {
        updateAnimals([]);
        locationMap = {};
      };

      return clearAnimals;
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

  const openGroupContextMenu = (group) => (event) => {
    openContextMenu('group-context-menu', { group });
    event.preventDefault();
  };

  const moveGroup = (group) => () => {
    setShowMap(true);
    setGroupBeingMoved(group);
    closeContext;
  };

  const showAreaMap = (area) => {
    setShowArea(area);
    setShowMap(false);
  };

  const setLocation = (position) => {
    const newArea = showArea;
    const newLocation = position;
    setShowArea(null);
    setGroupBeingMoved(null);
  };

  const setPairedLocation = (animal) => {
    setLocation(animal.location);
  };

  const closeModal = () => {
    setShowArea(null);
    setShowMap(false);
    setGroupBeingMoved(null);
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
    ? Object.values(locationMap).map((group, index) => {
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
            style={{ top: y, left: x }}
            onContextMenu={
              allowRightClick ? openGroupContextMenu(group) : null
            }>
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
      {allowRightClick && (
        <ContextMenuWithData id='group-context-menu'>
          {({ group }) => (
            <MenuItem>
              <Button
                onClick={moveGroup(group)}
                style={{ fontSize: '14px', padding: '10px 15px' }}>
                Move all Animals
              </Button>
            </MenuItem>
          )}
        </ContextMenuWithData>
      )}

      {showMap && (
        <Modal dismiss={closeModal}>
          <OverallMap onClick={showAreaMap} />
        </Modal>
      )}

      {showArea && (
        <Modal dismiss={closeModal}>
          <AreaMap
            area={showArea}
            showAnimals={true}
            onClick={setLocation}
            animalOnClick={setPairedLocation}></AreaMap>
        </Modal>
      )}
    </div>
  );
};

export default AreaMap;
