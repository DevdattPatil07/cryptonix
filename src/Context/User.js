const { createContext, useContext, useState } = require("react");

const UserContext = createContext(); 

export const UserContextProvider = ({children})=>{

    const [user,setUser] = useState();

    const values={
        user,
        setUser
    }

    return(<UserContext.Provider value={values}>{children}</UserContext.Provider>)
}

export const useUser = ()=> useContext(UserContext);