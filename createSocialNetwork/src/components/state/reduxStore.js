import { combineReducers, legacy_createStore as createStore } from "redux";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import profileReducer from "./profileReducer";
import userReducer from "./usersReducer";
import authReducer from "./auth-reducer";

// обьединение reducer || часть state : какой reducer отвечает за него
let reducers = combineReducers({
  profile: profileReducer,
  dialogs: dialogsReducer,
  sidebar: sidebarReducer,
  users: userReducer,
  auth: authReducer,
});

// создание store
let store = createStore(reducers);

window.store = store;

export default store;
