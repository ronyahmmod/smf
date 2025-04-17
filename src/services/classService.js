import { db } from "../firebase/firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
const classRef = collection(db, "classes");

export const getClasses = async () => {
  const snapshot = await getDocs(classRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addClass = async (data) => {
  return await addDoc(classRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateClass = async (id, data) => {
  return await updateDoc(doc(db, "classes", id), {
    ...data,
    updateAt: serverTimestamp(),
  });
};

export const deleteClass = async (id) => {
  return await deleteDoc(doc(db, "classes", id));
};
