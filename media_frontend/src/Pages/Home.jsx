
import React, { useEffect, useRef, useState } from 'react'
import { Link,Route,Routes, useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import UserProfile from '../Components/UserProfile'
import { client } from '../client'
import Logo from '../assets/MediaLogo.png'
import Pins from './Pins'
import WidgetsIcon from '@mui/icons-material/Widgets';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { userQuery } from '../utils/data'
export default function Home() {
  const navigate = useNavigate()
  const [user, setuser] = useState(null)
  const [show,setShow] = useState(false)
  const scrollRef = useRef(null);

  //for loggedin user
  const userInfo = localStorage.getItem('user') !== 'undefined'?JSON.parse(localStorage.getItem('user')) :localStorage.clear()
  
  
  useEffect(()=>{
    const query = userQuery(userInfo?.sub)
    client.fetch(query).then((data)=>{
      setuser(data[0])
    })
  },[])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });
  
  return (
    <>
<div style={{background:'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(27,43,55,1) 100%)'}} className=' flex h-screen'>
  <div className=' md:flex hidden'><Sidebar user={user && user}/></div>
  <div className='flex flex-col w-screen'>
  <div className=' lg:hidden flex justify-between'>
   <div className=' animate-slidedown flex gap-1 pt-4'>
     <span onClick={()=>{setShow(true)}} className='md:hidden mt-[-6px] flex p-2 text-slate-100 cursor-pointer'><WidgetsIcon /></span>
     <img className=' animate-[spin_1s] mt-[-11px] md:mt-[-10px] md:ml-2 ml-0 mr-1 cursor-pointer ' src={Logo} width='50px' alt="" />
     <p className=' text-red-200 font-semibold text-lg mt-0 md:mt-0'>Media Connect</p>
     </div> 
     <div className=' flex'>
      <Link className='flex gap-2 mr-4 mt-1 ' to={`user-profile/${user?._id}`}>
      <img className=' w-[40px] h-[40px] rounded-[50%] animate-slideright mt-[5px]  cursor-pointer' src={user?.image} alt={user?.name} width='50px' />
     <p className=' text-slate-200 font-normal text-md mt-[13px] md:flex  hidden  '> {user?.userName}</p>
      </Link>
      <div onClick={()=>navigate('/create-pin') } style={{background:'linear-gradient(90deg, rgba(151,91,193,0.8575581395348837) 0%, rgba(252,198,106,0.877906976744186) 100%)'}} className=' pt-[5.5px] scale-105 cursor-pointer mt-[9px] rounded-[50%] animate-[slideright_0.5s] text-sky-100 h-[40px] mr-2 ml-[-5px] px-2'><AddCircleOutlineIcon className=' animate-[spin_0.8s]'/></div>
     </div>
  </div>
  <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile user={user && user} />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
  </div>
</div>


{/* Sidebar For Small Device */}
{show && <div className=' animate-[slideleft_0.6s] md:hidden flex-initial top-0 fixed h-screen overflow-y-scroll w-4/5 z-100 backdrop-blur-sm left-0'>
  <Sidebar  user={user && user}/>
  <HighlightOffIcon onClick={()=> setShow(false)} className=' animate-slideright cursor-pointer scale-125 m-3' sx={{position:'absolute',right:0,top:0}}/>
</div>}

</>
 
  )
}
