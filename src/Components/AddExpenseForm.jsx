

import { useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addExpense } from '../ReduxStore/Slices/expenseSlice';
const AddExpenseCard = () => {


  const Navigate = useNavigate()
  const dispatch = useDispatch()


  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  const generateId = () => {
    const rawId = `${title}${amount}${category}`;
    const uniqueId = rawId.replace(/\s+/g, '-').toLowerCase()
    return `${uniqueId}-${Math.random().toString(36).slice(2)}`;
  }

  const logout=()=>{
    localStorage.removeItem('user')
    alert('logged out')
    Navigate('/')
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title || !amount || !category){
      alert ('please enter all the fields');
      return
    }


    dispatch(addExpense(
      {title, 
        amount, 
        category, 
        id: generateId()
      }));

    
    setTitle('');
    setAmount('');
    setCategory('');
    Navigate('/expenseList')
  }

  return (
    <>
    <header className="bg-white border-b sticky top-0 z-10 p-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-x-2 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-start items-center w-full md:w-auto">
              <a href="#" className="flex-shrink-0">
                <span className="font-bold text-xl sm:text-3xl">
                  <span className="text-blue-500">
                    Welcome to Expense Tracker v1.0
                  </span>
                </span>
              </a>
            </div>
            <div className="md:ml-auto py-2 md:py-0 w-full md:w-auto text-center md:text-right">
              <Link
                to="/userprofile"
                className="ml-2 md:ml-4 inline-block px-2 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Profile
              </Link>

              <Link
                to="/expenseList"
                className="ml-2 md:ml-4 inline-block px-2 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Expenses
              </Link>


              <button
                className="ml-2 md:ml-4 inline-block px-2 md:px-4 py-1 md:py-2 mt-2 md:mt-0 shadow-xl bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>


    <div className='container mx-auto mt-10 max-w-md shadow-lg'>
    <div className='border-2 border-gray-200 p-5 rounded-md bg-white shadow-sm'>
      <form onSubmit={handleSubmit}>
        <label className='mb-4'>
          Expense Heading
          <input
          onChange={e=>setTitle(e.target.value)}
          value={title}
            type='text'
            placeholder='...Title'
            className='w-full bg-blue-200 px-3 py-2 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300'
          />
        </label>
       
        <label className='mb-4'>
          Expense Amount
          <input
           onChange={e=>setAmount(e.target.value)}
           value={amount}
            type='number'
            placeholder='...Amount'
            className='w-full px-3 bg-blue-200 py-2 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300'
          />
        </label>
        <div className='mb-4'>
          <label className='mb-2'>
            Expense Category
          </label>
          <select 
          onChange={e=>setCategory(e.target.value)}
          value={category}
          className='block w-full bg-blue-200 px-3 py-2 rounded-md'>
            <option disabled selected value={''}>Select Category</option>
            <option value={'Food'}>Food</option>
            <option value={'Utilities'}>Utilities</option>
            <option value={'Entertainment'}>Entertainment</option>
            <option value={'Gadgets'}>Gadgets</option>
          </select>
        </div>
        <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' aria-label="Add Expense">
          Add Expense
        </button>
      </form>
    </div>
  </div>
  </>
  );
}

export default AddExpenseCard;