import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Masonrylayout from './Masonrylayout'
import { client, urlFor } from '../client'
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data'
import Spinner from './Spinner'
import Img from '../utils/LazyLoad'
import { Box, IconButton } from '@mui/material'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import Smspinner from './Smspinner'
export default function PinDetails({ user }) {
  const [pins, setPins] = useState(null)
  const [showpopup, setShowpopup] = useState(false)
  const [showpopuplove, setShowpopuplove] = useState(false)
  const [pindetail, setPindetail] = useState(null)
  const [comment, setComment] = useState([])
  const [addingComment, setAddingComment] = useState(false)
  const { pinId } = useParams()
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
  const [liked, setLiked] = useState(false)
  const [loved, setLoved] = useState(false)

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query)
        .then((data) => {
          setPindetail(data[0])

          if (data[0]) {
            query = pinDetailMorePinQuery(data[0])
            client.fetch(query)
              .then((res) =>
                setPins(res))
          }
        })
    }
  }
  useEffect(() => {
    fetchPinDetails()
  }, [pinId])

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const alreadyLicked = (pindetail?.like?.filter((item) => item?.postedBy?._id === userInfo?.sub))?.length
  const alreadyLoved = (pindetail?.love?.filter((item) => item?.postedBy?._id === userInfo?.sub))?.length
  console.log(alreadyLicked)
  console.log(pindetail?.like?.length)

  if (showpopup) {
    setTimeout(() => {
      setShowpopup(false)
    }, 1700);
  }

  if (showpopuplove) {
    setTimeout(() => {
      setShowpopuplove(false)
    }, 1700);
  }


  // for saving the likes
  const saveLike = () => {
    if (!alreadyLicked) {
      setLiked(true)
      client
        .patch(pinId).setIfMissing({ like: [] })
        .insert('after', 'like[-1]', [{
          userId: userInfo?.sub,
          _key: uuidv4(),
          postedBy: {
            _type: 'postedBy',
            _ref: userInfo?.sub
          }
        }])
        .commit().then(() => {
          setLiked(true)

        }
        )
    }
    else {
      setShowpopup(true)
    }

  }

    // for saving the loves
    const saveLove = () => {
      if (!alreadyLoved) {
        setLoved(true)
        client
          .patch(pinId).setIfMissing({ love: [] })
          .insert('after', 'love[-1]', [{
            userId: userInfo?.sub,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: userInfo?.sub
            }
          }])
          .commit().then(() => {
            setLoved(true)
  
          }
          )
      }
      else {
        setShowpopuplove(true)
      }
  
    }


  //  for saving the comments
  const addComments = () => {
    if (comment !== '') {
      setAddingComment(true)
      client
        .patch(pinId).setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{
          comment,
          _key: uuidv4(),
          postedBy: {
            _type: 'postedBy',
            _ref: userInfo?.sub
          }
        }])
        .commit().then(() => {
          setComment('')
          setAddingComment(false)
        }
        )
    }
  }

  if (!pindetail) {
    return <Spinner massage='Loading Post' />
  }
  return (
    <>
      <div className=' flex xl:flex-row flex-col xl:mx-0 mx-auto gap-3 md:justify-center lg:justify-center xl:justify-between  mt-5'>
        <div className='xl:max-w-[800px] max-w-none  flex flex-col '>
          <Link to={`/user-profile/${pindetail?.postedBy?._id}`}>
            <div className=' flex gap-2 mt-2'>
              <span ><img className='  object-cover animate-[slideleft_0.4s] border-2 rounded-[50%] w-[50px] h-[50px]' src={pindetail?.postedBy?.image} alt="" /></span>
              <p className=' text-xl font-semibold animate-[slideright_0.4s] mt-2 text-slate-200'>{pindetail?.postedBy?._id === userInfo?.sub ? "It's You" : pindetail?.postedBy?.userName}</p>  </div></Link>
          <h1 className='mt-2 text-red-200 font-semibold text-xl'> {pindetail?.title}</h1>
          <h3 className='mt-2 text-slate-300 font-semibold'> {pindetail?.about}</h3>
          {pindetail?.destination && <span onClick={(e) => {
          }} className=' text-orange-100 w-[300px]  text-sm cursor-pointer bg-violet-600 bg-opacity-40 backdrop-blur-md text-center border-l-2 border-t-2 border-yellow-200 border-2 pt-[5px] pb-2 px-2 animate-[slideleft_0.4s] rounded-lg my-2 '>
            <a
              className=' gap-1 flex justify-start' href={pindetail?.destination}
              target='_blank'
              rel='noreferrer'><PlayCircleFilledIcon className=' animate-[bounce_1.2s] pt-1' /> <p className=' text-green-200 pt-1 '>Recource</p>  <p className=' truncate w-[calc(100%-20px)] ml-1 text-red-200 pt-1'>{pindetail?.destination}</p> </a> </span>}
          <Img className=' rounded-2xl flex mt-4 xl:w-[800px] w-full ' src={pindetail?.image && urlFor(pindetail.image).url()} />
          <div className=' flex justify-around mt-3 '>
            <p className=' text-md text-slate-200 ml-3'>{pindetail?.like ? pindetail?.like?.length : '0'} likes</p>
            <p className=' text-md text-slate-200 ml-6'>{pindetail?.love ? pindetail?.love?.length : '0'} loves</p>
            <p className=' text-md text-slate-200'>{pindetail?.comments ? pindetail?.comments.length : '0'} Comments</p>
          </div>
          <div className=' flex justify-around mb-4'>
            {!liked && <ThumbUpOffAltIcon onClick={saveLike} className=' cursor-pointer text-white scale-150 mt-2' />}
            {liked && <ThumbUpIcon className=' cursor-pointer mt-2 scale-150 animate-[bounce_0.9s] transition-all duration-500' sx={{ color: 'blueviolet' }} />}

            {!loved && <FavoriteBorder onClick={saveLove} className=' cursor-pointer text-white scale-150 mt-2' />}
            {loved && <Favorite className=' cursor-pointer mt-2 scale-150 animate-[bounce_0.9s] transition-all duration-500' sx={{ color: '#ff9457' }} />}

            <Checkbox {...label} icon={<CommentIcon className=' text-white scale-150' />} checkedIcon={<CommentIcon className='scale-150' />} />
          </div>
        </div>
        {showpopup &&  <div className=' text-slate-950 font-semibold text-lg absolute bottom-[20px] bg-lime-100 p-3 animate-[slideright_0.5s] rounded-xl right-0 mr-4'> You Have Already Liked The Post</div>}
        {showpopuplove && <div className=' text-slate-950 font-semibold text-lg absolute bottom-[20px] bg-red-200 p-3 animate-[slideright_0.5s] rounded-xl right-0 mr-4'> You Have Already Loved The Post</div> }
        
        <div className=' flex flex-col'>

          <p className=' text-slate-300 text-3xl font-bold m-2'> Comments</p>
          <div className=" animate-[slideright_0.5s] max-h-[500px] overflow-y-scroll">
            {!pindetail?.comments?.length && (
              <p className=' text-slate-400 font-semibold my-5'> No Comments Yet, Please Do Comments !</p>
            )}
            {pindetail?.comments?.map((item) => (
              <div style={{ background: 'linear-gradient(260deg, rgba(203,241,237,0.7540266106442577) 0%, rgba(249,252,194,0.7960434173669468) 100%)' }} className="flex gap-1 py-4 px-5 mt-5 items-center rounded-r-[30px] rounded-l-md xl:w-auto max-w-[580px]" key={item.comment}>
                <img
                  src={item.postedBy?.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{item.postedBy?.userName}</p>
                  <p className=''>{item.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className=" animate-[slideright_0.5s] flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/${user?._id}`}>
              <img src={user?.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
            </Link>
            <input
              className=" xl:w-auto max-w-[400px] flex-1 border-gray-100  outline-none border-2 p-2 rounded-full focus:border-gray-300"
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)}
              required
            />
            <button
              style={{ background: 'linear-gradient(260deg, rgba(134,99,141,0.8240546218487395) 0%, rgba(244,117,117,0.7799607072691552) 100%)' }}
              type="submit"
              className=" text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComments}
            >
              {addingComment ? <Smspinner /> : 'Comment'}
            </button>
          </div>

        </div>
      </div>
      <div className=' flex flex-col mt-10'>
        {pins?.length > 0 && <p className=' md:text-left text-center text-red-200 font-bold text-3xl mt-4'> More Like This</p>}
        {pins?.length > 0 ? <Masonrylayout pins={pins} /> : <Spinner massage='Loading Releted Posts' />}
      </div>
    </>
  )
}
