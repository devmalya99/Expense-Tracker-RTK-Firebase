import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { delete_Expense } from "../ReduxStore/Slices/expenseSlice";
import UpdateTaskPopup from "./UpdateTaskPopup";
import ThemeButton from "./Buttons/ThemeButton";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [premium, setPremium] = useState(false);

  const expenses = useSelector((state) => state.ExpReducer.expensesArr);

  console.log(expenses);
  console.log(typeof expenses);
  const logout = () => {
    localStorage.removeItem("user");
    alert("logged out");
    Navigate("/");
  };

  const handleDelete = (id) => {
    dispatch(delete_Expense(id));
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
    const expensesCsv = expenses.map(row => Object.values(row));
    expensesCsv.unshift(Object.keys(expenses[0])); // add header row
  
    let csvContent = "data:text/csv;charset=utf-8," 
                    + expensesCsv.map(e => e.join(",")).join("\n");
      
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
  
    link.click();
  }

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-10 p-4 dark:bg-black dark:text-white">
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
                to="/addExpenseCard"
                className="ml-2 md:ml-4 inline-block px-2 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Expense
              </Link>

              <Link
                to="/userprofile"
                className="ml-2 md:ml-4 inline-block px-2 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                User Profile
              </Link>

              {premium && (
                <Link
                  to="/userprofile"
                  className="ml-2 md:ml-4 inline-block px-2 md:px-4 py-1 md:py-2 bg-purple-500 text-white rounded hover:bg-pink-600"
                >
                  Activate Premium
                </Link>
              )}

              <button
                onClick={logout}
                className="ml-2 md:ml-4 inline-block px-2 md:px-4 py-1 md:py-2 mt-2 md:mt-0 shadow-xl bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Logout
              </button>

              {
                premium && <ThemeButton/>
              }

              
            </div>
          </div>
        </div>
      </header>

      <div className="display div container mx-auto mt-10 max-w-md shadow-lg dark:bg-black dark:text-white">
        <div className="border-2 bg-blue-500 border-gray-200 p-4 rounded-md  shadow-sm dark:bg-black dark:text-white">
          <ul>
            {Array.isArray(expenses) &&
              expenses.length > 0 && // Check for array and non-empty
              expenses.map((expense) => (
                <div
                  className="flex border-2 mt-4 border-gray-200 p-5 rounded-md bg-white shadow-sm dark:bg-black dark:text-white"
                  key={expense.id}
                >
                  <li>
                    <p>{expense.title}</p>
                    <p>{expense.amount}</p>
                    <p>{expense.category}</p>
                  </li>
                  <button
                    onClick={() => handleEdit(expense.id)}
                    className="ml-2 px-4 py-2 rounded-xl text-xl bg-green-600 "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="ml-2 px-4 py-2 rounded-xl  bg-red-500 text-xl"
                  >
                    Delete
                  </button>
                </div>
              ))}

            {Array.isArray(expenses) &&
              expenses.length === 0 && ( // Show message if empty
                <p>No expenses found.</p>
              )}
          </ul>

          {isOpen && (
            <UpdateTaskPopup taskId={currentTaskId} setIsOpen={setIsOpen} />
          )}
        </div>
        {
          premium && <button 
          onClick={handleDownload} 
          className="p-2 ml-2 bg-pink-500 text-white rounded hover:bg-blue-600 dark:bg-blue-500  "
          >Download Your Data</button>
        }
        
      
      </div>
    </>
  );
};

export default ExpenseList;
