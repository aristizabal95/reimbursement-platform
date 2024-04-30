import { createContext, useState } from "react";

export const fetchData = async (path, setter) => {
    try {
        const data = await fetch(path);
        const resp = await data.json();
        setter(resp);
    } catch (error) {
        console.log(`Error while loading data from ${path}`, error)
    }
}
 
export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    return (<AuthContext.Provider values = {{auth, setAuth}} >
        {children}
    </AuthContext.Provider>);
}