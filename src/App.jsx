

import './App.css'
import Login from './Components/LoginForm'
import Signup from './Components/SignupForm'
import Forgot from './Components/ForgotPassword'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import ExpenseList from './Components/ExpenseList'
import AddExpenseCard from './Components/AddExpenseForm'
import {ProtectedRoute} from './ProtectedRoute/ProtectedRoute'
import ProfilePage from './Components/UserProfile'

function App() {
 
  
  return (
    <>
   
   <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgotPassword" element={<Forgot />} />
          <Route
            path="/addExpenseCard"
            element={
              <ProtectedRoute>
                <AddExpenseCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenseList"
            element={
              <ProtectedRoute>
                <ExpenseList />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/userprofile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />


          
        </Routes>
      </BrowserRouter>

     
    </>
  )
}

export default App
