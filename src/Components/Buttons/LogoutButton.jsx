import { signOut } from "firebase/auth";
import { FirebaseAuthentication } from "../../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const Navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await signOut(FirebaseAuthentication);
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
