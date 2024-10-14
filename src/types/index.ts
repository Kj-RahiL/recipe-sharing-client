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


  interface Ingredient {
    name: string;
    quantity: string;
    type: string;
  }
  
  export interface Step {
    description: string;
    duration: string;
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
    category: string[];
    tags: string[];
    isPublished: boolean;
    isPremium: boolean;
  }

  export interface RecipeResponse {
    success: boolean;
    message: string;
    data?: RecipeFormData;
  }