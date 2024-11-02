import { collection, setDoc,query, getDocs,getDoc,doc } from "firebase/firestore";
import { firestore, storage } from "../config/firbase";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { identity } from "utils/appUtils";

export const useCreateDoc = (colName) => {
    const ref = collection(firestore, colName);
    const mutation = useFirestoreCollectionMutation(ref);
    return mutation.mutateAsync;
}

export const updateDocData =async ({colName,docId,data, onSuccess=identity, onError=identity}) =>{
    const docRef = doc(firestore, colName, docId);

    await setDoc(docRef, data, { merge: true })
      .then(() => {
        console.log(" Document has been updated successfully");
        onSuccess()
        return true;
      })
      .catch((error) => {
        console.log(error);
        onError()
      });
}

export const fileInsertion = ({file, folderPath,fileName}) =>{
  const imageRef = ref(storage, folderPath + fileName);
  let  fileURL ;
  return uploadBytes(imageRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref).then((url) => {
      console.log({ url });
      fileURL = url;
    const fileFullPath = snapshot?.metadata.fullPath
      return {fileFullPath , fileURL}
    });
    
  });
}
  