import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import  routingReducer from "./slices/routingSlice";
import  searchReducer from "./slices/searchSlice";
import loadingReducer from "./slices/loadingSlice";
=======
import routingReducer from "./slices/routingSlice";
import searchReducer from "./slices/searchSlice";
import popupReducer from "./slices/popupSlice"
>>>>>>> 7334abb (git add update popup direction on hover)

export const store = configureStore({
    reducer: {
        routing: routingReducer,
        search: searchReducer,
<<<<<<< HEAD
        loading: loadingReducer
=======
        popup: popupReducer
>>>>>>> 7334abb (git add update popup direction on hover)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch