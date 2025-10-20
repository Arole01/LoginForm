import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosCart } from 'react-icons/io'
import { FaHome } from 'react-icons/fa'
import { CartContext } from "../Pages/cartContext"
import { useContext } from 'react'
import { AppContext } from '../Pages/authContext'

export const Header = () => {
  const { cart } = useContext(CartContext);
    const { logout,user} = useContext(AppContext)
  return (
    <header className='header'>
      {user ? <>
      <p>Welcome {user.name.split(" ")[0]}</p>
      <nav>
        <Link to={"/cart"}>{cart.items.length}<IoIosCart/></Link>

        <Link to={"/"}><FaHome/></Link>
      </nav>
      <button onClick={()=>{logout()}}>Logout</button>
      </> :
      <>
      <nav>
        <Link to={"/Login"}>Login</Link>

        <Link to={"/"}><FaHome/></Link>
      </nav>
      </>
      }
    </header>
  )
}

export default Header
