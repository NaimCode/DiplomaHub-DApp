import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../Data/serveur";

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
    update: (state, action) => {
      Object.assign(state.data, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { connexion, deconnexion, update } = userSlice.actions;

export default userSlice.reducer;
