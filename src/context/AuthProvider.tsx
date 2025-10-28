import { api } from "../service/api";
import { AuthContext } from "./AuthContext";
import { useEffect, useState, type ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [eventos, setEventos] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [names, setNames] = useState<string>('');
  const [rol, setRol] = useState<number>(0);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
      const loadSesion = async () => {
        const res = await api.get("/usuarios/verifySesion");
  
        if (res.data.data) {
          setIsAuth(true);
          setId(res.data.data.id);
          setNames(res.data.data.names);
          setRol(res.data.data.idrol);
          setEmail(res.data.data.email);
        }
      };
      loadSesion();
    }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        id, 
        setId,
        names, 
        setNames,
        rol, 
        setRol,
        email,
        setEmail,
        eventos,
        setEventos
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
