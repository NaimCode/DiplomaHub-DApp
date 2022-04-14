import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isMember: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connexion: (state, action) => {
      state.data = action.payload.data;
      state.isMember = action.payload.isMembre;
    },
    deconnexion: (state) => {
      state.data = null;
      //email
      //isMember
    },
  },
});

// Action creators are generated for each case reducer function
export const { connexion, deconnexion } = userSlice.actions;

export default userSlice.reducer;
