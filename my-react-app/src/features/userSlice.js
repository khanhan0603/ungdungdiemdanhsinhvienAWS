import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null, 

  },
  reducers: {
    userLoginSuccess: (state, action) => {
      state.currentuser = action.payload.user;

    },
    userLogout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { userLoginSuccess, userLogout } = userSlice.actions;
export default userSlice.reducer;
