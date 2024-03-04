

import { createSlice } from "@reduxjs/toolkit";

const MyThemeSlice = createSlice({
    name:'theme',
    initialState:{
        themeIs:false,
    },

    reducers:{
        toggleTheme:(state)=>
        {
            state.themeIs= !state.themeIs
        }
        
    }
})

export const {toggleTheme}  = MyThemeSlice.actions
 
const ThemeReducer = MyThemeSlice.reducer

export default ThemeReducer;