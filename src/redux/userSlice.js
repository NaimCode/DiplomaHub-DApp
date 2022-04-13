import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email:null,
  isMember:true
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connexion: (state, action) => {
      state.id = action.payload.id;
      state.email=action.payload.email;
      state.isMember=action.payload.isMembre
    },
    deconnexion: (state) => {
      state.id = null;
      //email
      //isMember
    },
  },
});

// Action creators are generated for each case reducer function
export const { connexion, deconnexion } = userSlice.actions;

export default userSlice.reducer;
