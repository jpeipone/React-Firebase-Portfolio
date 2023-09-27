import { useContext, createContext, useState } from "react";

export const UserContext = createContext();
const ContextData = ({ children }) => {
  const [readData, setReadData] = useState();
  const [userdata, setUserdata] = useState();
  const [logged, setLogged] = useState();
  const [UIDinvestor, setUIDinvestor] = useState();

  return (
    <UserContext.Provider
      value={{
        readData,
        setReadData,
        userdata,
        setUserdata,
        logged,
        setLogged,
        UIDinvestor,
        setUIDinvestor,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextData;