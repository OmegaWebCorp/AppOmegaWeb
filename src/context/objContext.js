import { createContext, useContext } from "react";

export const useObj = () => {
    return useContext(ObjContext);
};