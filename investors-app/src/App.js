import "./App.css";
import NavigationMenuBar from "./components/Navigation/NavigationMenuBar";
import HomePage from "./components/Pages/HomePage";
import AddInvestmentForm from "./components/Pages/addPage/AddInvestmentForm";
import EditInvestmentForm from "./components/Pages/editPage/EditInvestmentForm";
import InvestmentPage from "./components/Pages/investmentPage/InvestmentPage";
import LoginPage from "./components/Pages/loginpage/LoginPage";

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
          <Route path="/edit/investment/:id" element={<EditInvestmentForm />} />
          <Route path="/show/investment/:id" element={<InvestmentPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
