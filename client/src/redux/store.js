import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux"
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore} from "redux-persist";
import thunk from 'redux-thunk';

import authReducer from "../slices/authSlice.js";
import cartReducer from "../slices/cartSlice.js";
import searchReducer from "../slices/searchSlice.js";

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    auth:authReducer,
    cart:cartReducer,
    search:searchReducer
})
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:[thunk]
});
export const persistor = persistStore(store)