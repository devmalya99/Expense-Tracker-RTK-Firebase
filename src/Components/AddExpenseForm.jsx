
import { getDatabase, ref, push } from "firebase/database";
import { FirebaseAuthentication } from "../Firebase/FirebaseConfig";
import { useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import ThemeButton from './Buttons/ThemeButton';
import { addExpense } from '../ReduxStore/Slices/expenseSlice';
import LogoutButton from './Buttons/LogoutButton';
import VerifyEmail from "./Buttons/VerifyEmail";
const AddExpenseCard = () => {


  const Navigate = useNavigate()
  const dispatch = useDispatch()


  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')





  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title || !amount || !category){
      alert ('please enter all the fields');
      return
    }

    const db = getDatabase();
    const userId = FirebaseAuthentication.currentUser.uid;
     

    let newExpense = {
      title, 
      amount, 
      category, 
    };

    push(ref(db, `users/${userId}/expenses`), newExpense);

    dispatch(addExpense( newExpense));

    
    setTitle('');
    setAmount('');
    setCategory('');
    Navigate('/expenseList')
  }

  return (
    <div className="h-screen">
  <header className="flex items-center justify-between px-6 py-4 bg-indigo-500 text-white shadow-md sticky top-0 z-10 dark:bg-gray-800">
  <div className="flex items-center justify-start space-x-6 md:space-x-12">
    <a href="#" className="font-bold text-2xl md:text-4xl">
      Welcome to Expense Tracker v1.0
    </a>
  </div>
  <div className="hidden md:flex items-center space-x-1 md:space-x-2">
    <Link
      to="/userprofile"
      className="px-4 py-2 bg-white text-indigo-500 rounded-lg hover:bg-indigo-100 transition-colors"
    >
      Profile
    </Link>

    <Link
      to="/expenseList"
      className="px-4 py-2 bg-white text-indigo-500 rounded-lg hover:bg-indigo-100 transition-colors"
    >
      Expenses
    </Link>

    <VerifyEmail className="transition-colors hover:text-indigo-100" />
    <LogoutButton className="px-4 py-2 bg-transparent border-2 border-white text-white rounded-lg hover:border-indigo-200 transition-colors" />
  </div>
  <div className="md:hidden">
    <button className="text-black dark:text-white hover:text-indigo-300 dark:hover:text-gray-200">
      <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
        <path fillRule="evenodd" d="M2 4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 1 0 0-2H2V5a1 1 0 0 0-1-1z"/>
      </svg>
    </button>
  </div>
</header>

<div className='container mx-auto mt-10 max-w-md shadow-2xl shadow-black py-6 bg-indigo-500 rounded-md dark:bg-gray-800 '>
  <div className='p-5 rounded-md bg-white shadow-sm dark:bg-gray-900 dark:text-gray-100'>
    <form onSubmit={handleSubmit}>
      <label className='block mb-4'>
        Expense Heading
        <input
          onChange={e => setTitle(e.target.value)}
          value={title}
          type='text'
          placeholder='...Title'
          className='w-full mt-2 p-3 bg-teal-500 dark:bg-gray-700 text-black dark:text-gray-200 rounded-lg focus:outline-none focus:shadow-outline focus:border-indigo-300'
        />
      </label>

      <label className='block mb-4'>
        Expense Amount
        <input
          onChange={e => setAmount(e.target.value)}
          value={amount}
          type='number'
          placeholder='...Amount'
          className='w-full mt-2 p-3  bg-teal-500 dark:bg-gray-700 text-black dark:text-gray-200 rounded-lg focus:outline-none focus:shadow-outline focus:border-indigo-300'
        />
      </label>

      <div className='mb-4'>
        <label className='block'>
          Expense Category
        </label>
        <select 
        onChange={e => setCategory(e.target.value)}
        value={category}
        className='block w-full mt-2  bg-teal-500 dark:bg-gray-700 text-black dark:text-gray-200 p-3 rounded-lg'>
          <option disabled value=''>Select Category</option>
          <option value='Food'>Food</option>
          <option value='Utilities'>Utilities</option>
          <option value='Entertainment'>Entertainment</option>
          <option value='Gadgets'>Gadgets</option>
        </select>
      </div>

      <button className='w-full mt-4 bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded' aria-label="Add Expense">
        Add Expense
      </button>
    </form>
  </div>
</div>
  </div>
  );
}

export default AddExpenseCard;