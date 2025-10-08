import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Fuera de contexto");
  }
  return context;
};

export default useAuth;
