import React, { useState } from 'react'
import { client, urlFor } from '../client'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, useNavigate } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

export default function Pin({pin: {postedBy , image , _id,destination,save},user}) {
  const navigate = useNavigate()
  const [postHovered ,setpostHovered] = useState(false)
  const [savingPost ,setsavingPost] = useState(false)
  const userInfo = localStorage.getItem('user') !== 'undefined'?JSON.parse(localStorage.getItem('user')) :localStorage.clear()
  const alreadySaved = (save?.filter((item)=> item?.postedBy?._id === userInfo?.sub))?.length

   const savePin = (id)=>{
    if (!alreadySaved) {
      setsavingPost(true)
      client
      .patch(id).setIfMissing({save:[]})
      .insert('after', 'save[-1]',[{
        userId:userInfo?.sub,
        _key:uuidv4(),
        postedBy:{
          _type:'postedBy',
          _ref:userInfo?.sub
        }
      }])
      .commit().then(()=>
      {window.location.reload()
      setsavingPost(false)}
      )
    }
   }

   const deletePin = (id)=>{
   client.delete(id).then(()=>{
    window.location.reload()
   })
   }
  return (
    <div  className=' text-white md:mb-3 mb-0 md:p-0 p-2'>
      <div onMouseEnter={()=>setpostHovered(true)}
      onMouseLeave={()=>setpostHovered(false)}
      className=' relative cursor-zoom-in w-auto hover:rounded-xl overflow-hidden duration-300 ease-in-out hover:scale-105'>
        <img onClick={()=>navigate(`/pin-detail/${_id}`)} style={{opacity: postHovered? 0.5 :1}} className=' rounded-md w-full transition-all duration-300' src={(urlFor(image).width(500).url())} alt="" />
       <Link to={`/user-profile/${postedBy?._id}`}>
       <div className=' flex gap-2 mt-2'>
          <span ><img className=' object-cover border-2 rounded-[50%] w-[50px] h-[50px]' src={postedBy?.image} alt="" /></span>
         <p className=' text-lg mt-2'>{postedBy?.userName}</p>  </div></Link> 
        
        {postHovered && (
          <>
         <div onClick={(e)=> e.stopPropagation()} className=' border-l-2 border-b-2 border-red-300 border-r-2 cursor-pointer  bg-violet-600 bg-opacity-40 backdrop-blur-md text-center  pb-2 pt-0 animate-[slideright_0.4s] rounded-b-lg w-[50px] top-0 right-0 mr-2 absolute'>
            <a href={`${image?.asset?.url}?dl=`}>
            <CloudDownloadIcon className=' animate-[spin_1s] mt-[1px] mb-[-2px]'/>
            </a>
          </div>
          { destination &&<div onClick={(e)=>{
    e.stopPropagation()
  }} className=' text-orange-100 text-sm cursor-pointer bg-violet-600 bg-opacity-40 backdrop-blur-md text-center border-l-2 border-t-2 border-yellow-200 border-r-2 pt-[5px] pb-2 px-2 animate-[slideleft_0.4s] rounded-t-lg  bottom-[calc(0%+58px)] left-0 ml-2 absolute'>
   <a
   className=' gap-1 flex ' href={destination}
                       target='_blank'
                       rel='noreferrer'><PlayCircleFilledIcon className=' animate-[bounce_1.2s] pt-1'/> <p className=' text-green-200 pt-1'>Recource</p>  <div className=' ml-1 text-red-200 pt-1'>{destination.slice(0,10)}..</div> </a> </div>}
          {userInfo?.sub === postedBy?._id &&<div onClick={(e)=>{
    e.stopPropagation()
    deletePin(_id)
  }} className=' text-orange-100 text-base cursor-pointer  bg-violet-600 bg-opacity-40 backdrop-blur-md text-center border-l-2 border-t-2 border-red-100 border-r-2   pb-2 pt-0 animate-[slideright_0.4s] rounded-t-lg w-[50px]  bottom-[calc(0%+58px)] right-0 mr-2 absolute'> <DeleteForeverIcon className=' text-red-300 animate-[spin_1s] mt-[3px] mb-[-2px]'/></div>}
{alreadySaved? (
  <div onClick={(e)=>{
    e.stopPropagation()
  }} className=' text-orange-100 text-sm cursor-pointer border-l-2 border-b-2 border-cyan-200 border-r-2  bg-violet-600 bg-opacity-40 backdrop-blur-md text-center py-2 px-2 animate-[slideleft_0.4s] rounded-b-lg  top-0 left-0 ml-2 absolute'>
   {save?.length} Saved 
  </div>
  ):(
    <div onClick={(e)=>{
    e.stopPropagation()
    savePin(_id)
  }} className=' text-orange-100 text-sm cursor-pointer border-l-2 border-b-2 border-cyan-200 border-r-2  bg-violet-600 bg-opacity-40 backdrop-blur-md text-center  py-2 px-2 animate-[slideleft_0.4s] rounded-b-lg w-[70px] top-0 left-0 ml-2 absolute'>{savingPost?'Saving..':'Save'}</div>
  )
}
</>
        )}
      </div>
    </div>
  )
}
