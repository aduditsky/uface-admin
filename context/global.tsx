import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import useLocalStorage from '../lib/useLocalStorage';

interface IProps {
  children: ReactNode;
}

export interface IUser {
  login: string;
  status: string;
  image: string | undefined;
  roles: [];
}

export type GlobalContent = {
  authenticated: boolean;
  user: IUser | null;
  setUser: (u: IUser) => void;
};

export const GlobalContext = createContext<GlobalContent>({
  authenticated: false, // set a default value
  user: null,
  setUser: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export default function ContextProvider({ children }: IProps) {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <GlobalContext.Provider value={{ authenticated: !!user, user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
}
