import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    image: string;
  }

const initialState  = {
  name: "",
  email: "",
  password: "",
  phone: "",
  image: "",
};
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setUser: (state, action:PayloadAction<UserState>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.password = action.payload.password
      state.phone = action.payload.phone
      state.image = action.payload.image
    },
  },
});

export const {setUser} = registerSlice.actions

export default registerSlice.reducer

