import "./App.css";
import Login from "./components/Authentication/Login";
import AddInvestment from "./components/Firestore/AddInvestment";
import ReadAllUserInvestments from "./components/Firestore/ReadAllUserInvestments";
import NavigationMenuBar from "./components/Navigation/NavigationMenuBar";
import HomePage from "./components/Pages/HomePage";
import AddInvestmentForm from "./components/Pages/addPage/AddInvestmentForm";
import LoginPage from "./components/Pages/loginpage/LoginPage";
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
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddInvestmentForm />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
      <Login />
      <AddInvestment />
      <ReadAllUserInvestments />
    </div>
  );
}

export default App;
