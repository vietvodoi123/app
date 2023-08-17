import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INavState {
  nav: string;
}
const initialState: INavState = {
  nav: "phongban",
};

const CompanyNavSlice = createSlice({
  name: "companyNav",
  initialState,
  reducers: {
    setCompanyNav: (state, action: PayloadAction<string>) => {
      state.nav = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCompanyNav } = CompanyNavSlice.actions;

export default CompanyNavSlice.reducer;
