import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Vault from "./components/Vault";
import AddPassword from "./components/AddPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/add" element={<AddPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

