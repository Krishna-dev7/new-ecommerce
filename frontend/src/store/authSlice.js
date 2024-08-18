import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId: '',
  username: '',
  status: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login:  (state, action) => {
      state.status = true;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },

    getUser: (state)  => {
      return state;
    },

    logout:  (state) => {
      state.userId = '';
      state.username = '';
      state.status = false;
    }

  }

});

// to extract their actions
export const { login, logout, getUser } = authSlice.actions;

export default authSlice.reducer;
