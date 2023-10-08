import { useContext, createContext, useState } from "react";

export const UserContext = createContext();
const ContextData = ({ children }) => {
  const [readData, setReadData] = useState();
  const [userdata, setUserdata] = useState([
    {
      id: 123,
      name: "welcome",
      price: 42,
      amount: 100,
      cost: 95,
      cashInvested: 4,
      boughtDate: "11.10.2023",
      value: 600,
    },
    {
      id: 456,
      name: "investor",
      price: 2000,
      amount: 4,
      cost: 600,
      cashInvested: 1000,
      boughtDate: "11.10.2023",
      value: 8000,
    },
  ]);
  const [logged, setLogged] = useState(false);
  const [UIDinvestor, setUIDinvestor] = useState(null);
  const [portfolioUser, setPortfolioUser] = useState();

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
        portfolioUser,
        setPortfolioUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextData;
