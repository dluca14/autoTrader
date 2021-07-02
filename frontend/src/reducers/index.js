import { combineReducers } from "redux";
import auth from "./accounts";
import errors from "./errors";

export default combineReducers({
    auth,
    errors
});