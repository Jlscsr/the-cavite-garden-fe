import { ref } from "vue";
import { storage } from "../boot/firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const uploadImage = async (file, productCategory) => {
  const url = ref(null);
  const filename = `${Date.now()}_${file.name}`; // Adding timestamp to ensure unique filenames
  const filePath = storageRef(storage, `${productCategory}/${filename}`);

  try {
    const snapshot = await uploadBytes(filePath, file);
    url.value = await getDownloadURL(snapshot.ref);
    console.log(url.value);
    return url.value;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const uploadFiles = async (files, path) => {
  const urls = [];

  for (const file of files) {
    const filename = `${Date.now()}_${file.name}`;
    const filePath = storageRef(storage, `${path}/${filename}`);

    try {
      const snapshot = await uploadBytes(filePath, file);
      const url = await getDownloadURL(snapshot.ref);
      urls.push(url);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  return urls;
};

const deleteImageFromFirebase = async (url) => {
  const fileRef = storageRef(storage, url);

  try {
    await deleteObject(fileRef);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export { uploadImage, uploadFiles, deleteImageFromFirebase };
