import { useState } from "react"
import { useSelector } from "react-redux"
import { update_Expense } from "../ReduxStore/Slices/expenseSlice"
import { useDispatch } from "react-redux"

const UpdateTaskPopup = ({setIsOpen, taskId}) => {
 const dispatch = useDispatch()

  const myExpenseArr= useSelector((state)=>state.ExpReducer.expensesArr)
 
  const {title,amount,category} = myExpenseArr.find((item)=>item.id ===taskId)


    const handleUpdate = () => {
        dispatch(update_Expense({
          id:taskId, 
          title:newExpense, 
          amount:newAmount, 
          category:newCategory
        }))
        setIsOpen(false);
    }

   

    const [newExpense, setNewExpense] = useState(title)
    const [newAmount, setNewAmount] = useState(amount)
    const [newCategory, setNewCategory] = useState(category)



    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 dark:bg-black dark:text-white">
        <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg p-5 text-gray-800">
          <h1 className="w-full text-center text-2xl font-semibold py-3">Update Your Expenses</h1>
          <div className="mt-6">
            <input
              type="text"
              value={newExpense}
              onChange={(e) => setNewExpense(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded outline-none focus:border-green-400 focus:shadow-focus-green"
            />
            
            <input
              type="number"
              value={newAmount}
              placeholder="Enter new amount"
              onChange={(e) => setNewAmount(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded outline-none focus:border-green-400 focus:shadow-focus-green"
            />
            
            <div className='mb-4'>
          <label className='mb-2'>
            Expense Category
          </label>
          <select 
          
          onChange={e=>setNewCategory(e.target.value)}
          value={newCategory}
          className='block w-full bg-blue-200 px-3 py-2 rounded-md'>
            <option disabled selected value={''}>Select Category</option>
            <option value={'Food'}>Food</option>
            <option value={'Utilities'}>Utilities</option>
            <option value={'Entertainment'}>Entertainment</option>
            <option value={'Gadgets'}>Gadgets</option>
          </select>
        </div>


            <button
              onClick={handleUpdate}
              className="w-full mt-4 bg-blue-500 text-white p-3 rounded hover:bg-blue-400 focus:outline-none focus:shadow-focus-blue active:scale-95"
            >
              Update Expense
            </button>
          </div>
        </div>
      </div>
  )
}

export default UpdateTaskPopup