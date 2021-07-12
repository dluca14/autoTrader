import { combineReducers } from "redux";
import auth from "./accounts";
import trading from "./trading";
import errors from "./errors";

export default combineReducers({
    auth,
    trading,
    errors
});