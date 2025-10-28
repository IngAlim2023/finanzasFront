import { createContext } from "react";

interface Context{
     isAuth: boolean,
     setIsAuth:(isAuth:boolean)=>void,
     id:number,
     setId:(id:number) => void,
     names:string,
     setNames:(names:string)=>void,
     rol:number,
     setRol:(rol:number) => void,
     email:string,
     setEmail:(email:string) => void,
     eventos:boolean,
     setEventos:(eventos:boolean) => void
}

export const AuthContext = createContext<Context|undefined>(undefined)