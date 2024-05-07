import { createContext, useState } from "react";
import axios from 'axios'

export const fetchData = async (path, setter) => {
    try {
        const resp = await axios.get(path, 
            {headers: { 'Content-Type': 'application/json'}})
        setter(resp.data);
    } catch (error) {
        console.log(`Error while loading data from ${path}`)
    }
}

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    return (<AuthContext.Provider value = {{auth, setAuth}} >
        {children}
    </AuthContext.Provider>);
}