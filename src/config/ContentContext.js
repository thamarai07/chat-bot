import { createContext } from "react";
import generateAppContent from "websiteContent/main";


export const AppContentContext = createContext(generateAppContent());