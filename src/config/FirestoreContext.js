import { getAuth } from "firebase/auth";
import { createContext } from "react";

import {firestore} from "./firbase"


export const FirebaseContext = createContext(firestore);

export const AuthenticationConext = createContext();