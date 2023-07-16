import React from 'react'
import {ColorRing} from 'react-loader-spinner'
export default function Smspinner({massage}) {
  return (
    <div className=' text-teal-100 flex flex-col justify-center items-center w-full h-full '>
<ColorRing
  visible={true}
  height="20"
  width="20"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>

    </div>
  )
}
