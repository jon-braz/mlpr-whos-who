import firestore from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
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
}
