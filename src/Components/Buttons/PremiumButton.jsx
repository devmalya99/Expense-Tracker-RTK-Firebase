
import { Link } from 'react-router-dom'

const PremiumButton = () => {
  return (
    <div><Link
    to="/userprofile"
    className="ml-2 md:ml-4 inline-block px-2 md:px-4 py-1 md:py-2 bg-purple-500 text-white rounded hover:bg-pink-600"
  >
    Activate Premium
  </Link></div>
  )
}

export default PremiumButton