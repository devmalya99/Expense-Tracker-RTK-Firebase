
import { getDatabase, ref, push } from "firebase/database";
import { FirebaseAuthentication } from "../Firebase/FirebaseConfig";
import { useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import ThemeButton from './Buttons/ThemeButton';
import { addExpense } from '../ReduxStore/Slices/expenseSlice';
import LogoutButton from './Buttons/LogoutButton';

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
      id: generateId()
    };

    push(ref(db, `users/${userId}/expenses`), newExpense);

    dispatch(addExpense( newExpense));

    
    setTitle('');
    setAmount('');
    setCategory('');
    Navigate('/expenseList')
  }

  return (
    <>
    <header className="bg-white border-b sticky top-0 z-10 p-4 dark:bg-black dark:text-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-x-2 lg:px-8 dark:bg-black dark:text-white">
          <div className="md:flex md:items-center md:justify-between dark:bg-black dark:text-white">
            <div className="flex justify-start items-center w-full md:w-auto dark:bg-black dark:text-white">
              <a href="#" className="flex-shrink-0">
                <span className="font-bold text-xl sm:text-3xl">
                  <span className="text-blue-500">
                    Welcome to Expense Tracker v1.0
                  </span>
                </span>
              </a>
            </div>
            <div className="md:ml-auto py-2 md:py-0 w-full md:w-auto text-center md:text-right dark:bg-black dark:text-white">
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


              <LogoutButton/>
            </div>
          </div>
        </div>
      </header>


    <div className='container mx-auto mt-10 max-w-md shadow-lg dark:bg-black dark:text-white'>
    <div className='border-2 border-gray-200 p-5 rounded-md bg-white shadow-sm dark:bg-black dark:text-white'>
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
  <option disabled value={''}>Select Category</option>
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