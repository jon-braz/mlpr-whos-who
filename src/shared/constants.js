export const areaNames = {
  front: 'Front',
  redbarn: 'Red Barn',
  bluebarn: 'Blue Barn',
  yard: 'Yard',
  field: 'Field',
  oldfolks: 'Old Folks Block'
};

export const AREAS = {
  front: { name: 'Front', color: 'purple', id: 'front' },
  redbarn: { name: 'Red Barn', color: 'red', id: 'redbarn' },
  bluebarn: { name: 'Blue Barn', color: 'blue', id: 'bluebarn' },
  yard: { name: 'Yard', color: 'brown', id: 'yard' },
  field: { name: 'Field', color: 'green', id: 'field' },
  oldfolks: { name: 'Old Folks Block', color: 'grey', id: 'oldfolks' }
};

export const SPECIES = [
  { id: 'pig', label: 'Pig' },
  { id: 'horse', label: 'Horse' },
  { id: 'donkey', label: 'Donkey' },
  { id: 'sheep', label: 'Sheep' },
  { id: 'pony', label: 'Pony' },
  { id: 'goat', label: 'Goat' },
  { id: 'chicken', label: 'Chicken' }
];

export const COLLECTION_ANIMALS = 'animals';
export const COLLECTION_USERS = 'users';

export const PERMISSIONS = {
  write: 'writer',
  admin: 'admin'
};

// View configuration for the areas (whether to open in map-view or list-view)
export const VIEW_MODES = {
  map: 'map',
  list: 'list',
  default: 'map'
};

// Keys for local storage
export const STORAGE_KEYS = {
  viewMode: 'viewMode'
};

export const ANIMAL_PROPERTIES = {
  dangerLevel: 'dangerLevel',
  enrichment: 'enrichment',
  food: 'food',
  medication: 'medication',
  name: 'name'
};
