import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import {FirebaseAuthentication} from '../Firebase/FirebaseConfig'
import Header from '../Components/Header'
import {signInWithEmailAndPassword} from 'firebase/auth'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      alert("please enter all the fields");
    }
    try {
      await signInWithEmailAndPassword(
        FirebaseAuthentication,email, password)
    } catch (error) {
      console.log(error)
    }

    
    console.log("Login successful", email, password);

    Navigate("/addExpenseCard");
    

  };
  return (

    <>
    <Header/>
    <section className="bg-white-800">
      <div className="grid grid-cols-2 md:h-screen lg:py-0 px-6 py-8 mx-auto items-center justify-items-center">
        <img className="justify-self-center"
             src="https://expenseless.netlify.app/static/media/header-cover.feb3609bcec11e31f808.jpg"
             alt="Paisa Kaha Gaya Image"
             width="740"
             height="582" />
        <div className="bg-white w-full max-w-2xl p-6 m-4 rounded-lg  dark:bg-black  md:mt-0 sm:max-w-md xl:p-0">
        <h2 className="font-bold text-2xl mb-5 text-gray-800 dark:text-gray-100">Login</h2>
        <form
              onSubmit={handleFormSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  aria-required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text:white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  aria-required="true"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-semester 3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-3 text-sm text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgotPassword"
                  tabIndex="0"
                  aria-label="Forgot Password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 hover:border-2  "
              >
                Log in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <Link
                  to="/"
                  aria-label="Sign Up"
                  tabIndex="0"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>

      </div>
    </section>

  
  </>
    
           

  );
};

export default Login;
