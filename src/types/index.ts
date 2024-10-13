export interface IUser {
    id: string;
    name: string;
    role: string;
    email: string;
    image: string;
    status: string;
  }

  
 export interface RegisterResponse {
    success: boolean;
    message: string;
    data?: IUser;
  }
  
 export interface LoginResponse {
    success: boolean;
    message:string;
    token?: string;
    data: IUser;
  }