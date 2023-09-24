import "./App.css";
import Login from "./components/Authentication/Login";
import AddInvestment from "./components/Firestore/AddInvestment";
import ReadAllUserInvestments from "./components/Firestore/ReadAllUserInvestments";

function App() {
  return (
    <div className="App">
      <Login />
      <AddInvestment />
      <ReadAllUserInvestments />
      hello world
    </div>
  );
}

export default App;
