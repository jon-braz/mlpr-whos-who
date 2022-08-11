import { firestore, storage } from './firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import { COLLECTION_ANIMALS, COLLECTION_USERS, PERMISSIONS } from './constants';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const parseDoc = (doc) => ({
  ...doc.data(),
  id: doc.id
});

export default class ApiService {
  /**
   * User-management
   */

  static getUsers() {
    return getDocs(collection(firestore, COLLECTION_USERS)).then((userDocs) => {
      const users = userDocs.docs.map(parseDoc);

      return users;
    });
  }

  static getUser(uid) {
    const docRef = doc(firestore, COLLECTION_USERS, uid);
    return getDoc(docRef).then(parseDoc);
  }

  static addOrUpdateUser = (user) => {
    const { uid, ...toAdd } = user;

    return setDoc(doc(firestore, COLLECTION_USERS, uid), toAdd);
  };

  static updateUserRoles = ({ user, admin = false, writer = false }) => {
    return ApiService.addOrUpdateUser({
      ...user,
      [PERMISSIONS.admin]: admin,
      [PERMISSIONS.write]: writer
    });
  };

  /**
   * Animal management
   */

  static fetchAnimal({ id }) {
    const docRef = doc(firestore, COLLECTION_ANIMALS, id);
    return getDoc(docRef).then(parseDoc);
  }

  static fetchAnimals({ area, location, rehomed = false, fetchAll }) {
    let queryConditions = [];
    if (!fetchAll) {
      queryConditions = [where('rehomed', '==', rehomed)];
    }

    if (area) {
      queryConditions = [...queryConditions, where('area', '==', area)];
    }

    if (location?.length === 2) {
      queryConditions = [
        ...queryConditions,
        where('location', 'array-contains', location[0])
      ];
    }

    let q = query(
      collection(firestore, COLLECTION_ANIMALS),
      ...queryConditions
    );

    return getDocs(q).then((animalDocs) => {
      const animals = animalDocs.docs.map(parseDoc);
      return animals;
    });
  }

  static getGroupedAnimals({ animal }) {
    if (!animal.area || animal.location?.length !== 2) {
      return Promise.resolve([]);
    }

    const { area, location } = animal;
    const [x, y] = location;

    return ApiService.fetchAnimals({ area, location }).then((animals) =>
      animals.filter(
        (fetchedAnimal) =>
          fetchedAnimal.location[0] === x &&
          fetchedAnimal.location[1] === y &&
          fetchedAnimal.id !== animal.id
      )
    );
  }

  static async addAnimal(animal) {
    const toAdd = await ApiService.prepAnimalForWrite(animal);
    const animalsCollection = collection(firestore, COLLECTION_ANIMALS);

    return addDoc(animalsCollection, toAdd);
  }

  static async updateAnimal(animal) {
    const toAdd = await ApiService.prepAnimalForWrite(animal);
    const animalsCollection = collection(firestore, COLLECTION_ANIMALS);

    return setDoc(doc(animalsCollection, animal.id), toAdd);
  }

  static async prepAnimalForWrite(animal) {
    const { imageUpdated, imageDataUrl, id, ...toAdd } = { ...animal };
    toAdd.food = Array.isArray(toAdd.food)
      ? toAdd.food
      : toAdd.food?.split(',') || [];
    toAdd.location = toAdd.location?.map((str) => parseInt(str)) || [];
    toAdd.rehomed ||= false;
    delete toAdd.id;

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

    return toAdd;
  }

  static deleteAnimal(id) {
    const animalsCollection = collection(firestore, COLLECTION_ANIMALS);
    const animal = doc(animalsCollection, id);
    return deleteDoc(animal);
  }

  static async addAnimalImage(animalId, filename, fileDataUrl) {
    const fileRef = ref(storage, `animals/${animalId}/${filename}`);

    await uploadString(fileRef, fileDataUrl, 'data_url');
    return await getDownloadURL(fileRef);
  }
}
