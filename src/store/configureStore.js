//configureStore.js
import { createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

// Imports: Redux
import theirHashtagsReducer from "./reducers/theirHashtagsReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, theirHashtagsReducer);

let store = createStore(persistedReducer);

let persistor = persistStore(store);

// Exports
export { store, persistor };
