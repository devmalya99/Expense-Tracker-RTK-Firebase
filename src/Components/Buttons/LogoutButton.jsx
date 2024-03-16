import { signOut } from "firebase/auth";
import { FirebaseAuthentication } from "../../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from '../../Components/AuthContext/AuthContext'

const LogoutButton = () => {
  const Navigate = useNavigate();

  const {setIsAuthenticated}  = useContext(AuthContext);
  const handleLogOut = async () => {
    try {
      await signOut(FirebaseAuthentication);
      // Manually set the authentication to false
      setIsAuthenticated(false);

      alert("logged out");
      Navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
      className="ml-4 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded" 
      onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default LogoutButton;
