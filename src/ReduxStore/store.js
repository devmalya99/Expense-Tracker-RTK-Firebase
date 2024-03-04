

import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./Slices/expenseSlice";
import ThemeReducer from "./Slices/ThemeSlice";
const store = configureStore({
    reducer:{
        ExpReducer:expenseReducer,
        theme:ThemeReducer
    },
})

export default store
