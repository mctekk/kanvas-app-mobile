export interface ILoginResponse {
  token: string;
  refresh_token: string;
  time: string;
  expires: string;
  refresh_token_expires: string;
  id: number;
}

export interface IUser {
  displayname: string;
  email: string;
  firstname: string;
  id: string | number;
  lastname: string;
  photo: IPhoto;
  social: ISocial;
  description: string;
}

export interface IPhoto {
  url: string;
}
export interface IUserLocation {
  location?: string;
  longitude?: number;
  latitude?: number;
}

export interface IUserUpdate extends IUser {
  id: string;
  new_password: string;
  current_password: string;
  confirm_new_password: string;
  files?: any;
}

export interface ISignUpResponse {
  user: IUser;
  session: ILoginResponse;
}

export interface ISocial {
  is_blocked: boolean;
  is_following: boolean;
  total_followers: number;
  total_following: number;
  total_message: number;
}