import React from 'react'
import {ColorRing} from 'react-loader-spinner'
export default function Spinner({massage}) {
  return (
    <div className=' text-teal-100 flex flex-col justify-center items-center w-full h-full mt-[20vh]'>
<ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
<p className=' text-sm '>{massage}....</p>

    </div>
  )
}
