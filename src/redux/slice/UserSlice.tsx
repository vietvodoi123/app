import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccountInfo } from "../../types";

const initialState: IAccountInfo = {};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // action đăng nhập
    loginUser: (_, action: PayloadAction<IAccountInfo>) => {
      return action.payload;
    },
    // action đăng xuất
    logoutUser: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = UserSlice.actions;

export default UserSlice.reducer;
