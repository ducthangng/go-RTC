import { combineReducers, createSlice } from "@reduxjs/toolkit";
console.log("ok bro");
var slice = createSlice({
  name: "session",
  initialState: {
    userName: "",
    password: "",
    calleeName: "",
    friends: [{ name: "user1" }, { name: "user2" }],
    isCalling: false,
  },
  reducers: {
    call: (state, action) => {
      state.calleeName = action.payload.calleeName;
      state.isCalling = true;
    },
    disconnect: (state) => {
      state.calleeName = "";
      state.isCalling = false;
    },

    addUser: (state, action) => {
      state.userName = action.payload.username;
      state.password = action.payload.password;
    },
    deleteUser: (state) => {
      state.password = "";
      state.userName = "";
      state.calleeName = "";
    },
  },
});
export const { addUser, deleteUser, disconnect, call } = slice.actions;
export default slice.reducer;
