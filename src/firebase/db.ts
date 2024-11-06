import { Video } from "../models/Video";
import { firestore } from "./config";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const videoCollectionName = "videos";

const upsert = async (video: Video) => {
  if (!video.id) {
    const videosRef = collection(firestore, videoCollectionName);
    delete video.id;
    await addDoc(videosRef, video);
  } else {
    const videosRef = doc(firestore, videoCollectionName, video.id);
    await setDoc(videosRef, video);
  }
};

const get = async (id: string): Promise<Video | undefined> => {
  const videosRef = doc(firestore, videoCollectionName, id);
  const video = (await getDoc(videosRef)).data() as Video | undefined;
  return video;
};

const remove = async (id: string) => {
  await deleteDoc(doc(firestore, videoCollectionName, id));
};

const getAll = async () => {
  const videosRef = collection(firestore, videoCollectionName);

  const snapshot = await getDocs(videosRef);

  const videos: Video[] = [];

  snapshot.forEach((doc) => {
    videos.push({
      id: doc.id,
      title: doc.data().title,
      url: doc.data().url,
    });
  });
  return videos;
};

export const firebaseDB = {
  upsert,
  get,
  remove,
  getAll,
};
