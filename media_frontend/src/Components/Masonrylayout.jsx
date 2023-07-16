import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'
const breakpointObj = {
  default :4,
  3000 : 6,
  2000 :5,
  1200:3,
  1000:2,
  500:1,
}
export default function Masonrylayout({pins,user}) {
  return (
    <>
    <Masonry  breakpointCols={breakpointObj} className=' flex animate-[slideleft_0.5s] mt-5 md:gap-2 gap-0 '>
      {pins?.map((pin)=>
        <Pin key={pin?._id} pin={pin} user={user} className=' w-max' /> 
      )}
    </Masonry>
    </>
  )
}
