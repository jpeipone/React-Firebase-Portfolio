import { useContext, createContext, useState } from "react";

export const UserContext = createContext();
const ContextData = ({ children }) => {
  const [readData, setReadData] = useState();
  const [userdata, setUserdata] = useState([
    {
      id: "123",
      name: "welcome",
      price: 42,
      amount: 10,
      cost: 1,
      cashInvested: 42,
      boughtDate: "2023-10-11",
      value: 420,
    },
    {
      id: "456",
      name: "investor",
      price: 200,
      amount: 4,
      cost: 25,
      cashInvested: 100,
      boughtDate: "2023-10-11",
      value: 800,
    },
  ]);
  const [logged, setLogged] = useState(false);
  const [UIDinvestor, setUIDinvestor] = useState(null);
  const [portfolioUser, setPortfolioUser] = useState({
    AssetsSum: 2,
    NegativeAssetsSum: 0,
    PositiveAssetsSum: 2,
    TotalCost: 142,
    TotalValue: 1220,
  });

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
