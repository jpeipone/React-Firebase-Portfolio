import "./App.css";
import Login from "./components/Authentication/Login";
import AddInvestment from "./components/Firestore/AddInvestment";
import ReadAllUserInvestments from "./components/Firestore/ReadAllUserInvestments";
import PortfolioAssetsSummary from "./components/PortfolioSummary/PortfolioAssetsSummary";
import PortfolioValueSummary from "./components/PortfolioSummary/PortfolioValueSummary";
import TableAssets from "./components/TableAssets/TableAssets";

function App() {
  return (
    <div className="App">
      Portfolio Forecast
      <Login />
      <PortfolioValueSummary />
      <PortfolioAssetsSummary />
      <AddInvestment />
      <ReadAllUserInvestments />
      hello world
      <TableAssets />
    </div>
  );
}

export default App;
