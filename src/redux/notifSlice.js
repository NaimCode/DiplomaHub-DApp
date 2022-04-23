import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: null,
  display: false,
};

export const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    notifier: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.display = true;
    },
    exitNotif: (state) => {
      state.display = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { notifier, exitNotif } = notifSlice.actions;

export default notifSlice.reducer;
