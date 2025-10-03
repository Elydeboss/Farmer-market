// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"; // you already have this
import Signup from "./pages/BuyerReg";
import Dashboard from "../src/pages/Farmerdashboard";
import CreateAccountPage from "./pages/CreateAccountPage";

import "./App.css";

import BuyerDashboard from "./pages/BuyerDashboard";
import Overview from "./components/dashboard-components/Overview";
import MarketplacePage from "./pages/MarketplacePage";

import FarmBusinessDetails from "./pages/FarmBusinessDetails";
import VerificationDetails from "./pages/VerificationDetails";
import BankingPayment from "./pages/Signup";
import SignPage from "./pages/SigninPage";
import BuyerReg from "./pages/BuyerReg";
import SuccessPage from "./pages/SuccessPage";

import VerificationCode from "./pages/VerificationCode";

// Example extra pages (create About.jsx, NotFound.jsx later)
//function About() {
//  return <h2>About Page</h2>;
//}

function NotFound() {
  return <h2>404 — Page Not Found</h2>;
}

function App() {
  return (
    <Router>
      {/* Navigation */}
      {/*<nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/">Home</Link>
      </nav>*/}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createaccount" element={<CreateAccountPage />} />
        <Route path="/buyerdashboard" element={<BuyerDashboard />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
        </Route>

        <Route path="/businessdetails" element={<MarketplacePage />} />
        <Route path="/businessdetails" element={<FarmBusinessDetails />} />
        <Route path="verifyd" element={<VerificationDetails />} />
        <Route path="bankingpayment" element={<BankingPayment />} />
        <Route path="farmer" element={<Dashboard />} />
        <Route path="signin" element={<SignPage />} />
        <Route path="buyerreg" element={<BuyerReg />} />
        <Route path="verificationcode" element={<VerificationCode />} />
        <Route path="successpage" element={<SuccessPage />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
