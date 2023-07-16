import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export default function Navber({setSearchterm,searchterm,user}) {
    const navigate = useNavigate();
  return (
    <div className=' flex justify-between w-full'>
    <div style={{ background:'linear-gradient(90deg, rgba(196,233,232,0.7592592592592593) 0%, rgba(206,188,238,0.8485091556467412) 100%)'}} className="flex mt-2 md:m-0 m-auto md:w-[280px] w-[70vw] lg:justify-between md:justify-start justify-center items-center  px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
    <IoMdSearch fontSize={21} className="ml-1" />
    <input 
      type="text"
      onChange={(e) => setSearchterm(e.target.value)}
      placeholder="Search"
      value={searchterm}
      onFocus={() => navigate('/search')}
      className="p-2 w-full outline-none bg-transparent placeholder:text-slate-800"
    />
  </div>
  <div className=' flex  '>
  <Link className='lg:flex hidden gap-2 mr-4 ' to={`user-profile/${user?._id}`}>
      <img className=' w-10 rounded-[50%] animate-slideright cursor-pointer' src={user?.image} alt={user?.name} width='50px' height='50px' />
     <p className=' text-slate-200 font-normal text-md mt-[7px] flex '> {user?.userName}</p>
      </Link>
  <div onClick={()=>navigate('/create-pin') } style={{background:'linear-gradient(90deg, rgba(151,91,193,0.8575581395348837) 0%, rgba(252,198,106,0.877906976744186) 100%)'}} className=' xl:flex lg:flex hidden pt-[5.5px] scale-105 cursor-pointer mt-[0px] rounded-[50%] animate-[slideright_0.5s] text-sky-100 h-[40px] mr-2 ml-[-5px] px-2'><AddCircleOutlineIcon className=' animate-[spin_0.8s] mt-[2.5px]'/></div>
  </div>

  </div>
  )
}
