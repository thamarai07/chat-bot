// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

import { getFirestore, initializeFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// const app = initializeApp(firebaseConfig);
// export const firestore = getFirestore(app);
// export const storage = getStorage(app);

const app = initializeApp(firebaseConfig);
// export const firestore = getFirestore(app);
export const firestore = initializeFirestore(app, {useFetchStreams: false})
export const storage = getStorage(app);