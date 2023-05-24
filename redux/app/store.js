import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createAction } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";
import userReducer from "../features/user/userSlice";
import likesReducer from "../features/likes/likesSlice";
import messageReducer from "../features/message/messageSlice";

export const signOut2 = createAction("user/signOut");

const rootReducer = combineReducers({
  posts: postReducer,
  user: userReducer,
  likes: likesReducer,
  message: messageReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
export default store;
