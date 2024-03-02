import {useState} from 'react'
import {Link} from 'react-router-dom'
const UserProfile = () => {

    const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

 

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    alert("Profile updated successfully!");

    setFullName("");
    setProfilePhoto("");
  };


  return (
    <div className=''>
        <header className="bg-white border-b sticky top-0 z-10 p-4">
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
                to="/expenseList"
                className="ml-2 md:ml-4 inline-block px-2 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Expense
              </Link>
              <button
                className="ml-2 md:ml-4 inline-block px-2 md:px-4 py-1 md:py-2 mt-2 md:mt-0 shadow-xl bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>



      <div className="p-8 bg-gray-200">
      <h1 className="text-2xl font-bold mb-4">Contact Details</h1>
      <form onSubmit={handleProfileUpdate}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-bold mb-2"
          >
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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