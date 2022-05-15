import { firestore, storage } from './firebase';
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
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

export default class ApiService {
  static fetchAnimal({ name }) {
    const docRef = doc(firestore, COLLECTION_ANIMALS, name);
    return getDoc(docRef).then((animalDoc) => ({
      ...animalDoc.data(),
      id: animalDoc.id
    }));
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

  static async addOrUpdateAnimal(animal) {
    const { imageUpdated, imageDataUrl, ...toAdd } = { ...animal };
    toAdd.food = toAdd.food.split(',');
    toAdd.location = toAdd.location.map((str) => parseInt(str));
    const id = toAdd.name.toLowerCase().replaceAll(' ', '');
    let imagePath;

    if (imageUpdated && imageDataUrl) {
      imagePath = await ApiService.addAnimalImage(id, `1.jpg`, imageDataUrl);
      animal.imageUpdated = false;
      toAdd.imagePath = imagePath;
    } else if (imageUpdated) {
      delete toAdd.imagePath;
    }

    if (toAdd.dangerLevel === 'green') {
      delete toAdd.dangerReason;
    }

    const animalsCollection = collection(firestore, COLLECTION_ANIMALS);

    return setDoc(doc(animalsCollection, id), toAdd);
  }

  static async addAnimalImage(animalId, filename, fileDataUrl) {
    const fileRef = ref(storage, `animals/${animalId}/${filename}`);

    uploadString(fileRef, fileDataUrl, 'data_url');
    return await getDownloadURL(fileRef);
  }
}
