import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar/NavBar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import useAuth from "./context/useAuth";
import { useEffect } from "react";
import { api } from "./service/api";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Investments from "./pages/Investments";

const App = () => {
  const { setIsAuth, setId, setNames, setRol, setEmail } = useAuth();

  useEffect(() => {
    const loadSesion = async () => {
      const res = await api.get("/usuarios/verifySesion");

      if (res.data.data) {
        setIsAuth(true);
        setId(res.data.data.id);
        setNames(res.data.data.names);
        setRol(res.data.data.rol);
        setEmail(res.data.data.email);
      }
    };
    loadSesion();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/investments" element={<Investments />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
