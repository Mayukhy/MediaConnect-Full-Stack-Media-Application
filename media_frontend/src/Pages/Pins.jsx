import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Search from '../Components/Search'
import Navber from '../Components/Navber'
import PinDetails from '../Components/PinDetails'
import CreatePin from '../Components/CreatePin'
import Feed from '../Components/Feed'
export default function Pins({user}) {
  const [searchterm, setSearchterm] = useState('')
  return (
    <div className=' pt-2 px-2 md:px-5'>
        <div className=' bg-transparent'>
       <Navber searchterm={searchterm} setSearchterm={setSearchterm} user={user && user}/>
        </div>
        <div className=' h-full'>
        <Routes>
          <Route path="/" element={<Feed user={user}/>} />
          <Route path="/category/:categoryId" element={<Feed user={user} />} />
          <Route path="/pin-detail/:pinId" element={<PinDetails user={user && user} />} />
          <Route path="/create-pin" element={<CreatePin user={user && user} />} />
          <Route path="/search" element={<Search searchterm={searchterm} setSearchterm={setSearchterm} />} />
        </Routes>
        </div>
      
    </div>
  )
}
