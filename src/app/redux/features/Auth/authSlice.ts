import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUserLogin = {
  id: string;
  role: string;
  iat: number;
  exp: number;
  email: string;
};
type TAuthState = {
  user: null | TUserLogin;
  token: null | string;
};
const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      console.log("User set: ", state.user);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      console.log("Logged out");
    },
  },
});


export const { setLoginUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
