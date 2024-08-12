import { createContext } from 'react';

export interface IUserContext {
  userData: any;
  userToken: string;
  isLoading: boolean;
  isConnected: boolean;
  isUserLogged: boolean;
}

const Context = createContext<IUserContext>({} as IUserContext);
export const UserContext = Context;
export const UserContextProvider = Context.Provider;
export const UserContextConsumer = Context.Consumer;
