// Imports: Dependencies
import { combineReducers } from "redux";
// Imports: Reducers
import theirHashtagsReducer from "./Reducers/theirHashtagsReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
  theirHashtagsReducer: theirHashtagsReducer,
});
// Exports
export default rootReducer;
