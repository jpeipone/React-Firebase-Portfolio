import "./App.css";
import Login from "./components/Authentication/Login";
import AddInvestment from "./components/Firestore/AddInvestment";
import ReadAllUserInvestments from "./components/Firestore/ReadAllUserInvestments";
import NavigationMenuBar from "./components/Navigation/NavigationMenuBar";
import PortfolioAssetsSummary from "./components/PortfolioSummary/PortfolioAssetsSummary";
import PortfolioValueSummary from "./components/PortfolioSummary/PortfolioValueSummary";
import TableAssets from "./components/TableAssets/TableAssets";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationMenuBar />
        <Routes>
          <Route path="/" element={<TableAssets />} />
          <Route path="/login" element={<PortfolioAssetsSummary />} />
        </Routes>
      </Router>
      Portfolio Forecast
      <Login />
      <div className="porfolio-summaries">
        <PortfolioValueSummary />
        <PortfolioAssetsSummary />
      </div>
      <AddInvestment />
      <ReadAllUserInvestments />
      hello world
      <TableAssets />
    </div>
  );
}

export default App;
