import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { FirebaseAuthentication } from "../Firebase/FirebaseConfig";
import axios from 'axios';
import LogoutButton from './Buttons/LogoutButton';
const API_KEY = 'AIzaSyA5AMoLCs0LylGNaa_jY7Vk_6PdBeULeMA';
const UPDATE_PROFILE_REQUEST =`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;


const UserProfile = () => {

  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [user, setUser] = useState(null);

  //Fetch user details if exists


  useEffect(()=>{
    if(FirebaseAuthentication.currentUser){
      setFullName(FirebaseAuthentication.currentUser.displayName);
      setProfilePhoto(FirebaseAuthentication.currentUser.photoURL);
    }
    
  },[])


  useEffect( ()=>{
    async function updateUserDeatils(){
      const idToken =  FirebaseAuthentication.currentUser?.getIdToken(true);
      
      // Log the ID token
      console.log(`idToken: ${idToken}`);

       // Executes if idToken exists 

       if(idToken){
        //set user state
        setUser(FirebaseAuthentication.currentUser);
        setFullName(FirebaseAuthentication.currentUser.displayName);
        setProfilePhoto(FirebaseAuthentication.currentUser.photoURL);
       }
    }
    updateUserDeatils();
    console.log(user)

  },[])
 

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if(!fullName || !profilePhoto) {
      alert("Please enter full name and profile photo");
      return;
    }
    
    try {
      // get the current user's ID token
      const idToken = await FirebaseAuthentication.currentUser.getIdToken(true);
  
      const response = await axios.post(UPDATE_PROFILE_REQUEST, {
          idToken, 
          displayName: fullName,
          photoUrl: profilePhoto,
          returnSecureToken: true
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
  
      // Set state
      setFullName(response.data.displayName);
      setProfilePhoto(response.data.photoUrl);
      console.log('User profile response:', response.data);
  
      alert('Profile updated successfully!');
      } catch (error) {
          console.error(error);
      }
  

    
    alert("Profile updated successfully!");


  };
  


  return (
    <div className='h-screen'>
<header className="flex items-center justify-between px-6 py-4 bg-indigo-500 text-white shadow-md sticky top-0 z-10">
  <div className="flex items-center justify-start space-x-6 md:space-x-12">
    <a href="#" className="font-bold text-2xl md:text-4xl">
      Welcome to Expense Tracker v1.0
    </a>
  </div>
  <div className="hidden md:flex items-center space-x-1 md:space-x-2">
    <Link
      to="/addExpenseCard"
      className="px-4 py-2 bg-white text-indigo-500 rounded-lg hover:bg-indigo-100 transition-colors"
    >
      Add Expense
    </Link>

    <Link
      to="/expenseList"
      className="px-4 py-2 bg-white text-indigo-500 rounded-lg hover:bg-indigo-100 transition-colors"
    >
      View Expense
    </Link>

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



      <div className="p-8 bg-gray-200 dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Contact Details</h1>
      <div>
        <img src={profilePhoto} alt="Profile" className="w-21 h-20 rounded-full" />
      </div>
      <form onSubmit={handleProfileUpdate}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-bold mb-2 "
          >
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="appearance-none border rounded w-full dark:bg-blue-600 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="profilePhoto"
            className="block text-gray-700 font-bold mb-2"
          >
            Profile Photo URL:
          </label>
          <input
            type="text"
            id="profilePhoto"
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
            className="appearance-none border rounded w-full dark:bg-blue-600 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update
        </button>
        <button className="bg-red-400 ml-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <Link to="/home">Cancel</Link>
        </button>
      </form>
    </div>

    </div>
  )
}

export default UserProfile