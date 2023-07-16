import React, { useEffect, useState } from 'react'
import { client,urlFor } from '../client'
import Masonrylayout from './Masonrylayout'
import Spinner from './Spinner'
import { addQuery, feedQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate, useParams } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import CancelIcon from '@mui/icons-material/Cancel';
import ProfileBg from '../assets/images/bgforprofile.png'
import Smspinner from './Smspinner'
export default function UserProfile() {
  const navigate = useNavigate()
  const [postHovered ,setpostHovered] = useState(false)
  const [givebg,setGivebg] = useState(false)
  const [pins, setPins] = useState(null);
  const btns = ['Created', 'Saved']
  const [button , setButton] = useState('Created')
  const [savedpins, setsavedPins] = useState(null);
  const [loading,setloading] = useState(false)
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [show,setShow] = useState(false)
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [fields, setFields] = useState(true);
  const userInfo = localStorage.getItem('user') !== 'undefined'?JSON.parse(localStorage.getItem('user')) :localStorage.clear()
 
  // fetching the logedin user Data
  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading profile Background
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setloading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setloading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setloading(false);
      setWrongImageType(true);
    }
  };

  // saving the profile image background
  const saveImage = () => {
    if (imageAsset?._id) {
      setloading(true)
      const doc = {
        _type:'profilebg',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
      };
      client.create(doc).then(() => {
        window.location.reload()
        setloading(false)
      });
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };

  const [bgimages, setBgImages] = useState(null);
 
  //showing image to th user bg

  useEffect(() => {
    client.fetch(addQuery)
    .then((data) => {
      setBgImages(data);
    })
  }, [])


  useEffect(() => {
      setloading(true);
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setloading(false);
        console.log(pins)
      });
  }, []);
  useEffect(()=>{
  const savedPinsQuery = userSavedPinsQuery(userId);
   setloading(true)
   client.fetch(savedPinsQuery).then((res)=>{
    setsavedPins(res)
    setloading(false);
    console.log(savedpins)
   })
  },[userId])
  const ownpost = pins?.filter((post,id)=>post?.postedBy?._id === user?._id)
  const filturedBg = (bgimages?.filter((item)=>item?.postedBy?._id === user?._id))?.length
  console.log(filturedBg)
   
  //For the profile of other persons who have profile background
  const othersBg =( bgimages?.filter((item)=>item?.postedBy?._id === userId))?.length

  
  return (
    <>
    {givebg && (
      <div style={{background:'linear-gradient(260deg, rgba(203,241,237,0.667752135033701) 0%, rgba(239,245,137,0.6873599781709558) 100%)', zIndex:99999}}  className=' animate-[slideright_0.6s] absolute xl:w-[40vw] md:w-[60vw] w-full backdrop-blur-md right-0 h-[350px] object-cover bg-slate-400'>
        <CancelIcon onClick={(e)=>{
          e.stopPropagation()
          setGivebg(false)}} style={{ transition:'all 0.3s'}} className=' cursor-pointer animate-[slideleft_0.3s] scale-125 m-3 transition-all duration-300 hover:scale-150 hover:text-red-800'/>
        <label>
        <div  className=" flex flex-col items-center justify-center h-full">
                  <div  className="flex flex-col mt-10 justify-center items-center">
                    <p className="font-bold text-2xl text-lime-900 ">
                      <AddPhotoAlternateIcon className='animate-bounce absolute top-[120px]' />
                    </p>
                    <p  className=" mt-[-20px] text-lg text-sky-900 animate-[slideleft_0.5s]">Upload Background Image</p>
                  </div>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
        </label>
        <button onClick={saveImage} style={{background:'linear-gradient(260deg, rgba(105,57,172,0.5439425770308124) 0%, rgba(132,3,107,0.4767156862745098) 100%)',transform:'translate(-50%)'}} className=' mt-[-10px] absolute top-[50%] left-[50%] border w-[200px] hover:scale-110 transition-all duration-300 rounded-3xl py-2 px-3 text-slate-100 font-semibold text-lg'>  {loading ? <Smspinner/> : ' Add BackGround'} </button>
      </div>
    )}
    
    <div onMouseEnter={()=>setpostHovered(true)} onMouseLeave={()=>setpostHovered(false)}>
    {bgimages?.map((img)=>(
<>
      {/* for those users after giving profile background */}
      
    <div>
       { img?.postedBy?._id === user?._id &&  <div className=' relative'> 
<img style={{ display:img?.postedBy?._id === user?._id?'flex':'none',backgroundAttachment:'fixed'}}  className='h-[50vh] w-full transition-all duration-300 object-cover ' src={(urlFor(img?.image).width(1600).url())} alt="" />
{ postHovered && userId === userInfo?.sub && ( <>

{/* Delete Background Btn */}
<button onClick={()=>{
  if (img?.postedBy?._id === user?._id) {
    client.delete(img?._id)
        .then(() => {
        window.location.reload();
      });  
  }
}} style={{background:'linear-gradient(260deg, rgba(69,85,133,0.9052871148459384) 0%, rgba(168,113,239,0.8576680672268908) 100%)'}} className={'animate-[slideleft_0.5s] absolute bottom-[0px] border-t-2 border-r-2 border-amber-100 text-white font-bold px-3 py-2  rounded-tr-[20px] w-auto outline-none' } >Delete Background </button> 

{/* Add Background Btn */}
<button
              style={{background:'linear-gradient(260deg, rgba(134,99,141,0.8240546218487395) 0%, rgba(244,117,117,0.7799607072691552) 100%)'}}
                type="button"
                onClick={()=>{
                  setGivebg(!givebg)
                }}
                className={' bottom-0  absolute animate-[slideright_0.5s] right-0 border-t-2 border-l-2 border-amber-100 text-white font-bold rounded-tl-[20px] w-auto px-3 py-2 outline-none' }
              >
                Add a BackGround
 </button> 

 {/* Logout Btn */}
 <div className=' absolute right-0 top-0'>
     <button
              style={{background:'linear-gradient(260deg, rgba(105,57,172,0.9052871148459384) 0%, rgba(132,44,3,0.8576680672268908) 100%)'}}
                type="button"
                onClick={()=>{
                  localStorage.clear()
                  navigate('/login')
                }}
                className=" border-b-2 border-l-2 border-amber-100 text-white font-bold p-2 rounded-bl-[20px] w-20 animate-[slideleft_0.6s] outline-none"
              >
                <LogoutIcon className=' animate-bounce'/>
              </button>
    </div>
 </> )} 
    
    </div>
      }
      </div>

     {/* for those users before giving profile background */}
     <div>
     { img?.postedBy?._id !== userInfo?.sub && user?._id ===userInfo?.sub && <div onClick={()=>{
        setShow(!show)
      
      }}  className=' relative'> 
     <div  style={{ height:filturedBg === 0 ?'12vh':'0px',background:filturedBg === 0?'linear-gradient(260deg, rgba(175,209,212,0.8520658263305322) 0%, rgba(163,161,172,0.6873599781709558) 100%)':'transparent', backgroundSize:'cover',backgroundRepeat:'no-repeat'}} className='w-full relative  transition-all duration-300'></div>
  </div>
    }
    </div>
  </>
    ))}
    </div>

   {/* for those users before giving profile background the buttons */}
  {show && filturedBg === 0  && (
    <div >
      {/* Add Background Btn */}
<button
              style={{background:'linear-gradient(260deg, rgba(105,57,172,0.5439425770308124) 0%, rgba(132,3,107,0.4767156862745098) 100%)'}}
                type="button"
                onClick={()=>{
                  setGivebg(!givebg)
                }}
                className={'xl:top-0 z-50 lg:top-0 top-[55px]  absolute animate-[slideright_0.5s] xl:left-[210px] md:left-[210px] left-0 backdrop-blur-md border-r-2 border-b-2 border-amber-100 text-white font-bold rounded-br-[20px] w-auto px-3 py-2 outline-none' }
              >
                Add a BackGround
 </button> 
    </div>
  )}


  {/* Logout Btn for user without profile background */}
  {filturedBg === 0  &&
  <>
  <img className=' mt-[-330px] w-[300px] m-auto mb-9' src={ProfileBg} alt="" />
 <div className=' xl:top-0 lg:top-0 top-[55px] absolute right-0 z-50'>
 <button
          style={{background:'linear-gradient(260deg, rgba(51,0,119,0.5439425770308124) 0%, rgba(1,126,131,0.4767156862745098) 100%)'}}
            type="button"
            onClick={()=>{
              localStorage.clear()
              navigate('/login')
            }}
            className=" backdrop-blur-md border-l-2 border-b-2 border-amber-100 text-white font-bold px-3 py-2 rounded-bl-[20px]  w-20 animate-[slideleft_0.6s] outline-none"
          >
            <LogoutIcon className=' animate-bounce'/>
          </button>
</div>
</>}

    {/* {  img?.postedBy?._id !== user?._id && 
      <div style={{ height:filturedBg === 0 ?'12vh':'0px',background:filturedBg === 0?'linear-gradient(260deg, rgba(175,209,212,0.8520658263305322) 0%, rgba(163,161,172,0.6873599781709558) 100%)':'transparent'}} className='w-full relative  transition-all duration-300'>
        </div>}  */}
    
    
    <div className={userId === userInfo?.sub || othersBg === 1 ?' my-5 xl:mt-[-80px] mt-[-50px] flex flex-col justify-center items-center ':' my-5 xl:mt-[80px] mt-[50px] flex flex-col justify-center items-center '}>
      <span> <img className=' relative xl:w-[150px] w-[100px] xl:h-[150px] h-[100px] rounded-full object-cover' src={user?.image} alt="" /></span>
     <span className=' text-slate-300 font-semibold text-base'>{user?.userName}</span> 
    </div>
     <div className=' flex flex-col'>

      <div className=' flex justify-center gap-3'>
        {btns?.map((item)=>(
          <button
          style={{  background:button === item ? 'linear-gradient(260deg, rgba(134,99,141,0.8240546218487395) 0%, rgba(244,117,117,0.7799607072691552) 100%)':'#91dcf2',
        color:button === item ?'#e8faff':'#01212b'}}
            type="submit"
            className=" text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
            onClick={()=>{
              setButton(item)
            }}
          >{item}
          </button>
        ))} </div>
        <div className=' mx-3'>
     { button==='Created' && <Masonrylayout  pins={ownpost} user={user} />}
     {button==='Saved' &&  <Masonrylayout pins={savedpins} user={user} /> 
     }
        </div>
        {ownpost?.length === 0 && button==='Created' &&  <div className=' flex justify-center text-green-200 font-semibold mt-5 text-xl'>
        No Created Post Yet 😅
      </div>}
         {savedpins?.length === 0 && button==='Saved' &&  <div className=' flex justify-center text-green-200 font-semibold mt-5 text-xl'>
        No Saved Post Yet 😅
      </div>}
     </div>
 
    </>
  )
}
