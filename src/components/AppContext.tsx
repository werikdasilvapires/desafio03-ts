import { createContext, useEffect, useState } from "react"
import { getAllLocalStorage } from "../services/storage"

interface IUser {
  email: string;
  name: string;
  id: string;
}

interface IAppContext {
  user: IUser | null;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: IUser | null) => void; 
}
  
export const AppContext = createContext({} as IAppContext)
  
export const AppContextProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<IUser | null>(null)

  const storage = getAllLocalStorage()

  useEffect(() => {
    if(storage){
      const { login, user } = JSON.parse(storage)
      setIsLoggedIn(login)
      setUser(user)
    }
  }, [storage])
  
  return (
    <AppContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, setUser }}>
      { children }
    </AppContext.Provider>
  )
}