import React, { createContext, useContext, useEffect, useState } from "react";

// Create a single context for all data
export const AppContext = createContext();

// // Custom hook for accessing the context
// export function useAppContext() {
//   return useContext(AppContext);
// }

// Context provider component
export function AppContextProvider({ children }) {
  // State for user
  const initialValue = JSON.parse(localStorage.getItem("user")) || null;
  const [user, setUser] = useState(initialValue);

  // State for hotels 
  const [hotels, setHotels] = useState([]);

  // State for other 
  const [other, setOther] = useState({});

  useEffect(()=>{
    
  },[])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        hotels,
        setHotels,
        other,
        setOther,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
