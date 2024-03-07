import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { delete_Expense } from "../ReduxStore/Slices/expenseSlice";
import UpdateTaskPopup from "./UpdateTaskPopup";
import ThemeButton from "./Buttons/ThemeButton";
import { onValue, ref, remove, getDatabase } from "firebase/database";
import { FirebaseAuthentication } from "../Firebase/FirebaseConfig";
import PremiumButton from "./Buttons/PremiumButton";
import { addExpense } from "../ReduxStore/Slices/expenseSlice";

import {Chart as ChartJS} from 'chart.js/auto';

import { Bar, Line, Pie , Doughnut } from 'react-chartjs-2';


const ExpenseList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [premium, setPremium] = useState(false);

  // The initial state for expenses is an empty array
  const [expenses, setExpenses] = useState([]);

  console.log("expenses array is",expenses);

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
      .then(() => {
        alert("Expense Deleted");
        dispatch(delete_Expense(id));
      })
      .catch(console.error());
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
    let csv = "title,amount,category\n";

    expenses.forEach((expense) => {
      csv += `${expense.title},${expense.amount},${expense.category}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "expenses.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  useEffect(() => {
    const userId = FirebaseAuthentication.currentUser.uid;
    const db = getDatabase();
    const expensesRef = ref(db, `users/${userId}/expenses`);

    // The snapshot provides access to the data.
    onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Create an array from the returned object for rendering
        const newExpenses = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setExpenses(newExpenses);
        console.log("new data is ", newExpenses);

        // dispatch addExpense for each newExpense
        newExpenses.forEach((expense) => {
          dispatch(addExpense(expense));
        });
      } else {
        // If there are no expenses, set expenses to an empty array
        setExpenses([]);
      }
    });
  }, [dispatch]);

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
            <PremiumButton className="px-6 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-600 transition-colors" />
          )}

          <button
            onClick={logout}
            className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-lg hover:border-indigo-200 transition-colors"
          >
            Logout
          </button>

          {premium && (
            <ThemeButton className="transition-colors hover:text-indigo-100" />
          )}
        </div>
        <div className="md:hidden">
          <button className="block text-white hover:text-indigo-300">
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M2 4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 1 0 0-2H2V5a1 1 0 0 0-1-1z"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="container mx-auto p-6 my-12 bg-white rounded shadow-lg dark:bg-gray-800 dark:text-white">

<h2 className="mb-6 text-center text-3xl font-semibold">
  List of Expenses
</h2>


<div className="grid lg:grid-cols-2 gap-4">
<div className="listDiv">
{Array.isArray(expenses) && expenses.length > 0 ? (
    expenses.map((expense) => (
      
      <div key={expense.id} className=" rounded shadow p-5 m-4">

        <div className="flex justify-between">
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {expense.title.toUpperCase()}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              $ {expense.amount}
            </p>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white rounded font-semibold">
              {expense.category}
            </span>
          </div>

          <div>
            <button 
              onClick={() => handleEdit(expense.id)} 
              className="m-2 px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(expense.id)} 
              className="m-2 px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Delete
            </button>
          </div>

        </div>

      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 dark:text-gray-300">
      No Expenses found.
    </p>
)}

{isOpen && (
  <UpdateTaskPopup taskId={currentTaskId} setIsOpen={setIsOpen} />
)}

</div>

<div className="chart-div my-8 w-full mx-auto">

  

  <div className="w-full h-auto mt-4">
    <h2 className="sr-only">Expense Doughnut Chart</h2>
    <Doughnut 
      data = {{
        labels: expenses.map((each)=>each.category) , 
        datasets:[
          {
            label:"Expense",
            data:expenses.map((each)=>each.amount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
          }
        ]
      }}
    />
  </div>

  <div className="w-full h-auto">
    <h2 className="sr-only">Expense Bar Chart</h2>
    <Bar 
      data = {{
        labels: expenses.map((each)=>each.category),
        datasets:[
          {
            label:"Expense",
            data:expenses.map((each)=>each.amount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderRadius: 15,
          }
        ]
      }}
    />
  </div>

</div>


</div>





{premium && (
  <button 
    onClick={handleDownload} 
    className="block w-full mt-8 h-10 text-white bg-indigo-500 rounded hover:bg-indigo-600 dark:bg-indigo-800 dark:hover:bg-indigo-600 transition-colors"
  >
    Download Your Data
  </button>
)}

</div>
    </>
  );
};

export default ExpenseList;
