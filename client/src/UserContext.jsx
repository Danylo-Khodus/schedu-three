import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [userInfo, setUserInfo] = useState(null);
    const [infoLoading, setInfoLoading] = useState(false);
    return(
    <UserContext.Provider value={{userInfo,setUserInfo,infoLoading,setInfoLoading}}>
        {children}
    </UserContext.Provider>
    );
}