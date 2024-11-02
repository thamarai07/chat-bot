import { collection, query, getDocs, getDoc, doc, addDoc } from "firebase/firestore";
import { firestore } from "../config/firbase";

export const getQueryRef = async (ref, criteria) => {
  if (criteria) {
    return await query(collection(firestore, ref), ...criteria);

  } else {
    return await query(collection(firestore, ref));

  }
};

export const getDocumentsData = (colName, options = {}) => {
  const { query, callBack, ...rest } = options;

  let collectionRef;

  collectionRef = getQueryRef(colName, query);

  return collectionRef.then((colRef) => {

    return getDocs(colRef).then((docsRes) => {
      if (callBack) {
        callBack()
      }
      return docsRes.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
    })
  })

}

export const getDocData = (collection, id) => {
  const docRef = doc(firestore, collection, id)
  let docData;
  docData = getDoc(docRef).then((docSnap) => {
    return { id: docSnap.id, ...docSnap.data() }
  })
  return docData;
}

export const saveDocData = (colName, data) => {
  return addDoc(collection(firestore, colName), data);
}
