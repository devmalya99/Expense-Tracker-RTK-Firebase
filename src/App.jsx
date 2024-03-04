
import {useEffect} from 'react'
import './App.css'


import { useSelector} from 'react-redux';

import Navigation from './Components/Navigation';





function App() {
 
 const currTheme = useSelector((state) => state.theme.themeIs);
 console.log(currTheme)

  
  return (
    <div className={currTheme ? 'dark' : 'light'}>
   <div className='dark:bg-black dark:text-white'>
    <Navigation />
     
    </div>
   </div>
   
  )
}

export default App
