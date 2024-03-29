import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INavState {
  key: string; // key chuyển page của thanh điều hướng
  email: string | null; // email để xác thực lúc đăng ký
  steps: number; // vị trí ở trong các bước đăng ký
  workspace: number | null; // id company đang làm việc
}
const initialState: INavState = {
  key: "signin",
  email: null,
  steps: 0,
  workspace: null,
};

const NavSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setNavKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
      console.log(state.key);
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setSteps: (state, action: PayloadAction<number>) => {
      state.steps = action.payload;
    },
    setWorkspaceId: (state, action: PayloadAction<number>) => {
      state.workspace = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNavKey, setEmail, setSteps, setWorkspaceId } =
  NavSlice.actions;

export default NavSlice.reducer;
