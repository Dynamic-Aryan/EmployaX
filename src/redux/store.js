import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducer/userReducer";
import companySlice from "./reducer/companyReducer";
import jobSlice from "./reducer/jobReducer";

const store = configureStore({
    reducer:{
        user: userSlice,
        company: companySlice,
        job:jobSlice,
    }
})

export default store;