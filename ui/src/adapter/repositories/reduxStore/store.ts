import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionReducer";
export default configureStore({ reducer: sessionReducer });
