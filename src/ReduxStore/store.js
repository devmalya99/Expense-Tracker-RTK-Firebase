

import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./Slices/expenseSlice";

const store = configureStore({
    reducer:{
        ExpReducer:expenseReducer,
    },
})

export default store
