export const buildRoute = (path, queryParams) => {
  const queryParamString = queryParams
    ? Object.keys(queryParams)
        .filter((key) => Boolean(queryParams[key]))
        .reduce((str, key) => `${str}&${key}=${queryParams[key]}`, '?')
    : '';

  return `${path}${queryParamString}`;
};

export const buildLocationString = (animal) => animal.location.join('');

export const buildLocationMap = (animals) => {
  const locMap = (animals || []).reduce((map, animal) => {
    const locationString = buildLocationString(animal);
    const animalsAtLocation = map[locationString] || [];
    map[locationString] = [...animalsAtLocation, animal];
    return map;
  }, []);

  return locMap;
};

export const getColocatedAnimals = (animal, locationMap) => {
  const animalsAtLocation = locationMap[buildLocationString(animal)];
  return animalsAtLocation.filter((coloc) => coloc.id !== animal.id);
};
