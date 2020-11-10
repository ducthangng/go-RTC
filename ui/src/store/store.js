import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from "./friendsReducer";
import userReducer from "./friendsReducer";
export default configureStore({
  reducer: { friends: friendsReducer, user: userReducer },
});
