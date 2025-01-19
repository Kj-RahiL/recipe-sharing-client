/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
    id?: string;
    name: string;
    role: string;
    email: string;
    image: string;
    status: string;
    following:string[];
    followers:string[];
    bio?: string;
    isPaid: boolean
  }

export interface TUser {
    _id?: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    image: string;
    status: string;
    following:string[];
    followers:string[];
    bio?: string;
    isPaid: boolean
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


  interface Ingredient {
    name: string;
    quantity: string;
    type: string;
  }
  
  export interface Step {
    description: string;
    duration: string;
  }
  
  export interface TRecipe {
    _id: string;
    title: string;
    description: string;
    author:TUser;
    image: string;
    cookingTime: string;
    servings: string;
    difficulty: string;
    ingredients: Ingredient[];
    steps: Step[];
    category: string;
    comment: any[]; 
    upVotes: any[];
    downVotes: any[];
    rating: number[];
    tags: string;
    isPublished: boolean;
    isPremium: boolean;
  }
  
  export interface RecipeFormData {
    title: string;
    description: string;
    image: string;
    cookingTime: string;
    servings: string;
    difficulty: string;
    ingredients: Ingredient[];
    steps: Step[];
    category: string;
    tags: string;
    isPublished: boolean;
    isPremium: boolean;
  }
  

  export interface RecipeResponse {
    success: boolean;
    message: string;
    data?: RecipeFormData;
  }
  export interface UPdateRecipeResponse {
    success: boolean;
    message: string;
    data?: TRecipe;
  }

  export interface GetRecipeResponse {
    success: boolean;
    statusCode: number;
    message: string;
    totalCount: number;
    totalPages: number;
    currentPage: number;
    data: TRecipe[];
  }

  export interface UserResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: TUser[];
  }
  export interface SingleUserResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: any;
  }
  export interface forgetPasswordResponse {
    success: boolean;
    statusCode: number;
    message: string;
  }

  export type chatUser ={
    _id:string
    name:string
    email:string
    phone:string
    image:string
  }

  export interface ChatMessage {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
    isRead: boolean;
  }
  
  export interface LoadMessageSuccessPayload {
    msg: ChatMessage[];
  }
  