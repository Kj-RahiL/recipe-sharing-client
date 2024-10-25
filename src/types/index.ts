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

  export interface UserResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: TUser;
  }