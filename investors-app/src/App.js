import "./App.css";
import Login from "./components/Authentication/Login";
import AddInvestment from "./components/Firestore/AddInvestment";
import ReadAllUserInvestments from "./components/Firestore/ReadAllUserInvestments";
import TableAssets from "./components/TableAssets/TableAssets";

function App() {
  return (
    <div className="App">
      Hodl Forecast
      <Login />
      <AddInvestment />
      <ReadAllUserInvestments />
      hello world
      <TableAssets />
    </div>
  );
}

export default App;
