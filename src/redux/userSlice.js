import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connexion: (state, action) => {
      state.id = action.payload;
    },
    deconnexion: (state) => {
      state.id = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { connexion, deconnexion } = userSlice.actions;

export default userSlice.reducer;
