import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './LoginForm';
import Signup from './SignupForm';
import Forgot from './ForgotPassword';
import ExpenseList from './ExpenseList';
import AddExpenseCard from './AddExpenseForm';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import ProfilePage from './UserProfile';

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
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
  );
}

export default Navigation;