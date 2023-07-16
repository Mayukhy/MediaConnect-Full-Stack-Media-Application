import React, { useEffect, useRef } from 'react'
import {GoogleLogin} from '@react-oauth/google'
import Logo from '../assets/MediaLogo.png'
import {useNavigate} from 'react-router-dom'
import logVideo from '../assets/Videos/bgVideo.mp4'
import { client } from '../client';
import jwt_decode from 'jwt-decode'
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function Login() {
  const navigate = useNavigate()
  const responseGoogle = (response) => {
    console.log(response)
    const userResponse = jwt_decode(response.credential);

    localStorage.setItem('user', JSON.stringify(userResponse));
    const { name, sub, picture } = userResponse;
    
    //  this doc I can use in any component
    const doc = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture
    }
    
    client.createIfNotExists(doc).then(()=>{
        navigate('/', {replace: true})
    });

};
  return (
    <GoogleOAuthProvider clientId='use your id'>
    <div style={{background:'linear-gradient(180deg, rgba(120,130,150,0.7108262108262109) 0%, rgba(21,2,52,0.5271358543417367) 100%)'}} className=' flex flex-col w-screen h-screen'>
    <div className=' flex justify-center gap-5'>
        <video  type='video/mp4' loop controls={false} autoPlay muted style={{zIndex:-1}} className=' absolute object-cover w-screen h-screen ' src={logVideo}/>
      <img  className=' animate-slideleft w-[100px] mt-[40vh] ' src={Logo} alt="" />
      <h1 className=' text-slate-100 pt-7 animate-slideright text-4xl font-bold mt-[40vh]'>MediaConnect</h1>
    </div>
    <div className=' flex justify-center'>
      <GoogleLogin 
    onSuccess={responseGoogle}
    cookiePolicy="single_host_origin"
    onError={(res)=>{
      console.log(res)
    }}
    />

    </div>

    </div>
        </GoogleOAuthProvider>
  )
}
