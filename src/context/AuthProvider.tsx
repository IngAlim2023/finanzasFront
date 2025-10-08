import { AuthContext } from "./AuthContext";
import { useState, type ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [names, setNames] = useState<string>('');
  const [rol, setRol] = useState<string>('');
  const [email, setEmail] = useState<string>('');
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
        setEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
