import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/MediaLogo.png'
import HomeIcon from '@mui/icons-material/Home';
import { categories } from '../utils/data';
export default function Sidebar({user}) {
const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-l-4 border-indigo-500  transition-all duration-200 ease-in-out capitalize';

  return (
    <div style={{background:'linear-gradient(0deg, rgba(212,244,239,0.9164915966386554) 0%, rgba(210,210,210,1) 100%)'}} className=' md:w-[210px] w-auto animate-[slideleft_0.4s] h-screen '>
      <div className=' flex flex-col'>
        <Link to='/' className=' flex px-5 m-auto gap-2 my-6 w-[140px]  '>
            <img className=' animate-[spin_2s]' src={Logo} alt="" />
        </Link>
        <div className=' flex flex-col '>
        <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
          >
            <HomeIcon />
            Home
          </NavLink>
          <h3 className="mt-5 mb-1 px-5 text-base font-semibold 2xl:text-lg">Discover cateogries</h3>
         <div className='md:h-[calc(100vh-250px)] h-[calc(100vh-270px)] overflow-y-scroll'>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              key={category.name}
            >
              {/* <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" /> */}
              <p className=' mt-2 flex gap-3'>
              <img className=' w-[50px] h-[50px] rounded-full mt-[1px] mb-2' src={category?.image} alt="" />
              <p className=' mt-3'>{category.name}</p>
              </p>
            
            </NavLink>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}
