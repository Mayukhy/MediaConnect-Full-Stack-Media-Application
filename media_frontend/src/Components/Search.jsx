import React, { useEffect, useState } from 'react'
import { client } from '../client'
import Masonrylayout from './Masonrylayout'
import Spinner from './Spinner'
import { feedQuery, searchQuery } from '../utils/data'
export default function Search({searchterm,user}) {
  const [pins , setPins] = useState(null)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
  if (searchterm) {
    setLoading(true)
    const query = searchQuery(searchterm?.toLowerCase())
    client.fetch(query)
    .then((data)=>setPins(data))
    setLoading(false)
  }
  else{
    setLoading(true)
    client.fetch(feedQuery)
    .then((data)=>setPins(data))
    setLoading(false)
  }
  },[searchterm])
  return (
    <div>
      {loading && <Spinner massage='Searching Post'/>}
       {pins?.length === 0 && 
       (
        <div className=' text-gray-200 font-semibold text-2xl flex justify-center mt-10'> Sorry No Posts Found 🫥 </div>
       )}
      <Masonrylayout  pins={pins} user={user} />
    </div>
  )
}
