
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

<div className="container max-w-lg mx-auto p-4 md:p-8 my-10 bg-white rounded shadow-xl dark:bg-gray-800">
    <div className='p-4'>
        <h2 className="font-bold text-2xl mb-5 text-gray-800 dark:text-gray-100">Add Expense</h2>
        <form onSubmit={handleSubmit}>
            <label className="block mb-2">
                <span className="text-gray-800 dark:text-gray-200">Expense Heading</span>
                <input
                onChange={e => setTitle(e.target.value)}
                value={title}
                type='text'
                placeholder='Title'
                className='text-sm mt-2 block w-full p-3 text-black border rounded focus:outline-none focus:border-indigo-500'
                aria-label="Expense Heading"/>
            </label>
      
            <label className="block mb-2">
                <span className="text-gray-800 dark:text-gray-200">Expense Amount</span>
                <input
                onChange={e => setAmount(e.target.value)}
                value={amount}
                type='number'
                placeholder='Amount'
                className='text-sm mt-2 block text-black w-full p-3 border rounded focus:outline-none focus:border-indigo-500'
                aria-label="Expense Amount"/>
            </label>
      
            <div className='mb-4'>
                <label className="block mb-2">
                    <span className="text-gray-800 dark:text-gray-200">Expense Category</span>
                    <select 
                    onChange={e => setCategory(e.target.value)}
                    value={category}
                    className='text-sm mt-2 block w-full p-3 border rounded bg-white dark:bg-gray-700'>
                        <option disabled value=''>Select Category</option>
                        <option value='Rent'>Rent</option>
<option value='Transportation'>Transportation</option>
<option value='Healthcare'>Healthcare</option>
<option value='Electronics'>Electronics</option>
<option value='Groceries'>Groceries</option>
<option value='Clothing'>Clothing</option>
<option value='Education'>Education</option>
<option value='PersonalCare'>Personal Care</option>
<option value='Sports'>Sports</option>
<option value='Kids'>Kids</option>
<option value='Pets'>Pets</option>
<option value='GiftsDonations'>Gifts & Donations</option>
                    </select>
                </label>
            </div>
      
            <button className='w-full bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded' aria-label="Add Expense">
                Add Expense
            </button>
        </form>
    </div>
</div>
</div>
  );
}

export default AddExpenseCard;