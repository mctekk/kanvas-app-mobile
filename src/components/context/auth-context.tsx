import { createContext } from 'react';

export interface IAuthContext {
  signOut: () => void;
  signIn: (data: any) => void;
  signUp: (data: any) => void;
  updateUserData: (data: any) => void;
  selectedRoofTop: (data: any) => void;
}

const Context = createContext<IAuthContext>({} as IAuthContext);
export const AuthContext = Context;
export const AuthContextProvider = Context.Provider;
export const AuthContextConsumer = Context.Consumer;
