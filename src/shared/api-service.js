import firestore from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import { COLLECTION_ANIMALS } from './constants';

export default class ApiService {
  static fetchAnimal({ name }) {
    const docRef = doc(firestore, COLLECTION_ANIMALS, name);
    return getDoc(docRef).then((animalDoc) => animalDoc.data());
  }

  static fetchAnimals({ area }) {
    const q = query(
      collection(firestore, COLLECTION_ANIMALS),
      where('area', '==', area)
    );
    return getDocs(q).then((animalDocs) => {
      const animals = animalDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      return animals;
    });
  }

  static addOrUpdateAnimal(animal) {
    const toAdd = { ...animal };
    toAdd.food = toAdd.food.split(',');
    toAdd.location = toAdd.location.split(',').map((str) => parseInt(str));
    const id = toAdd.name.toLowerCase();

    const animalsCollection = collection(firestore, COLLECTION_ANIMALS);

    return setDoc(doc(animalsCollection, id), toAdd);
  }
}
