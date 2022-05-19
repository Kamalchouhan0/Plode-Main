import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import portReducer from "./ports/port.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["port"],
};

const rootReducer = combineReducers({
  port: portReducer,
  //   cart: cartReducer,
  //   directory: directoryReducer,
  //   shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
