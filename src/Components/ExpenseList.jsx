import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { delete_Expense } from "../ReduxStore/Slices/expenseSlice";
import UpdateTaskPopup from "./UpdateTaskPopup";
import ThemeButton from "./Buttons/ThemeButton";
import { onValue, ref, remove ,getDatabase } from "firebase/database";
import {FirebaseAuthentication} from "../Firebase/FirebaseConfig"
import PremiumButton from "./Buttons/PremiumButton";
import { addExpense } from "../ReduxStore/Slices/expenseSlice";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [premium, setPremium] = useState(false);

  // The initial state for expenses is an empty array
  const [expenses, setExpenses] = useState([]);

  console.log(expenses);

  const logout = () => {
    localStorage.removeItem("user");
    alert("logged out");
    Navigate("/");
  };

  const handleDelete = (id) => {
    const db = getDatabase();
    const userId = FirebaseAuthentication.currentUser.uid;
    const expenseRef = ref(db, `users/${userId}/expenses/${id}`);

    remove(expenseRef)
    .then(()=>{
      alert("Expense Deleted")
      dispatch(delete_Expense(id));
    })
    .catch((console.error()))
    
  };

  const handleEdit = (id) => {
    setIsOpen(true);
    setCurrentTaskId(id);
    
  };

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  useEffect(() => {
    if (totalExpense > 10000) {
      setPremium(true);
    }
  }, [totalExpense]);

  const handleDownload = () => {
    let csv = 'title,amount,category\n';
  
    expenses.forEach((expense) => {
      csv += `${expense.title},${expense.amount},${expense.category}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url; 
    link.download = 'expenses.csv';
    
    document.body.appendChild(link);
  
    link.click();
    
    document.body.removeChild(link);
  };

  useEffect(() => {
    const userId = FirebaseAuthentication.currentUser.uid;
    const db = getDatabase();
    const expensesRef = ref(db, `users/${userId}/expenses`);
    

    // The snapshot provides access to the data. 
    onValue(expensesRef , (snapshot)=>{
      const data = snapshot.val();
      if(data){
         // Create an array from the returned object for rendering
         const newExpenses = (Object.keys(data).map((key) => ({id: key, ...data[key]})));
         setExpenses(newExpenses)
         console.log("data is ")
         

         // dispatch addExpense for each newExpense
         newExpenses.forEach((expense)=>{
           dispatch(addExpense(expense))
         })

        }
      else {
        // If there are no expenses, set expenses to an empty array
        setExpenses([]);
      }

    });

 
  },[dispatch])

  return (
    <>
  <header className="flex items-center justify-between px-6 py-4 bg-indigo-500 text-white shadow-md">
  <div className="flex items-center justify-start space-x-6 md:space-x-12">
    <a href="#" className="font-bold text-2xl md:text-4xl">
      Welcome to Expense Tracker v1.0
    </a>
  </div>
  <div className="hidden md:flex items-center space-x-2">
    <Link
      to="/addExpenseCard"
      className="px-6 py-2 bg-white text-indigo-500 rounded-lg hover:bg-indigo-100 transition-colors"
    >
      Add Expense
    </Link>

    <Link
      to="/userprofile"
      className="px-6 py-2 bg-white text-indigo-500 rounded-lg hover:bg-indigo-100 transition-colors"
    >
      User Profile
    </Link>

    {premium && (
      <PremiumButton className="px-6 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-600 transition-colors"/>
    )}

    <button
      onClick={logout}
      className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-lg hover:border-indigo-200 transition-colors"
    >
      Logout
    </button>

    {premium && <ThemeButton className="transition-colors hover:text-indigo-100" />}
  </div>
  <div className="md:hidden">
    <button className="block text-white hover:text-indigo-300">
      <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
        <path fillRule="evenodd" d="M2 4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 1 0 0-2H2V5a1 1 0 0 0-1-1z"/>
      </svg>
    </button>
  </div>
</header>

<div className="container mx-auto p-6 mt-8 max-w-xl shadow-md bg-white dark:bg-gray-900 rounded-md h-screen">
    <h2 className=" mb-4 text-center font-bold dark:text-white text-4xl">List of Expenses</h2>
    {Array.isArray(expenses) ? (
        expenses.length > 0 ? (
            expenses.map(expense => (
                <div key={expense.id} className="flex flex-col bg-indigo-100 dark:bg-gray-800 rounded p-4 my-2 shadow-xl shadow-black mb-4 ">
                    <div className="flex justify-between items-start border-b-2 border-indigo-900 pb-2 mb-2">
    <div>
        <h3 className="font-bold text-xl text-indigo-900 dark:text-indigo-400">{expense.title.toUpperCase()}</h3>
        <p className="text-indigo-700 dark:text-indigo-300 mt-1">$ {expense.amount}</p>
        <span className="inline-block bg-indigo-200 text-orange-900 dark:text-indigo-900 font-semibold px-2 rounded-full">{expense.category}</span>
    </div>
    <div>
                            <button onClick={() => handleEdit(expense.id)} 
                                    className="px-4 py-2 rounded mr-2 text-sm font-bold bg-green-600 text-white hover:bg-green-700 transition-colors">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(expense.id)} 
                                    className="px-4 py-2 rounded text-sm font-bold bg-red-500 text-white hover:bg-red-700 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-center text-gray-500 dark:text-gray-300">No Expenses found.</p>
        )
    ) : null}

    {isOpen && <UpdateTaskPopup taskId={currentTaskId} setIsOpen={setIsOpen} />}

    {premium && (
        <button onClick={handleDownload} className="block mt-8 mx-auto px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
            Download Your Data
        </button>
    )}
</div>
    </>
  );
};

export default ExpenseList;
