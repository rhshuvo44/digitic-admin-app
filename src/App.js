import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Forgotpassword from "./pages/Forgotpassword";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<Resetpassword />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
      <Route path="admin" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
