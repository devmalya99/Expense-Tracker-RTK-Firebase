import React from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { toggleTheme } from '../../ReduxStore/Slices/ThemeSlice';
const ThemeButton = () => {
    const dispatch = useDispatch()
    const currTheme = useSelector((state) => state.theme.themeIs);

    const handleThemeSwitch = ()=>{
        dispatch(toggleTheme())
        console.log(currTheme)
    }

  return (
    <div><button
    className="p-2 ml-2 bg-pink-500 text-white rounded hover:bg-blue-600 dark:bg-blue-500  "
      onClick={handleThemeSwitch }
    >{currTheme? "🌞" : "🌙"}
    
    </button></div>
  )
}

export default ThemeButton