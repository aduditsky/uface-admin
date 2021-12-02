import * as React from 'react';

//Interfaces
interface IUserContext {
  user: object;
}

interface IUserState {
  user: object;
  setUser: () => {};
}

interface IContext {
  children: React.ReactNode;
}

const AppCtx = React.createContext<IUserContext | null>(null);

// Provider in your app
const AppContextModel: IUserContext = {
  user: {},
};

const Context = ({ children }: IContext) => {
  return <AppCtx.Provider value={AppContextModel}>{children}</AppCtx.Provider>;
};

export default Context;
