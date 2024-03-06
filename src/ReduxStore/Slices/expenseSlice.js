import {createSlice} from '@reduxjs/toolkit'
const expenseSlice = createSlice({
  name:'expenses',
  initialState:{
    expensesArr:[],
  },
  reducers:{
    addExpense:(state,action)=>{
      state.expensesArr.push({
        title:action.payload.title,
        amount:action.payload.amount,
        category:action.payload.category,
        id:action.payload.id
      })
    },

    delete_Expense:(state,action)=>{
      state.expensesArr=state.expensesArr.filter((each)=>each.id!==action.payload)
    },

    update_Expense:(state,action)=>{

      const {id,title,amount,category} = action.payload
      const reqIndex = state.expensesArr.findIndex((each)=>each.id ===id)

      if(reqIndex > -1){
        
        state.expensesArr[reqIndex].title = title
        state.expensesArr[reqIndex].amount = amount
        state.expensesArr[reqIndex].category=category

      }
      console.log("Updated State: ", state.expensesArr[reqIndex]); // Add this log

    }
  }
});

export const {addExpense , delete_Expense , update_Expense} = expenseSlice.actions
export default expenseSlice.reducer