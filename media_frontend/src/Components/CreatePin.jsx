import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { categories } from '../utils/data';
import { client } from '../client';
import Spinner from './Spinner';
import Img from '../utils/LazyLoad';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();


  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title || about || destination && imageAsset?._id || category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
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
        category,
      };
      client.create(doc).then(() => {
        navigate('/');
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
  return (
    <div className="flex flex-col justify-center items-center mt-10  lg:h-4/5">
      
      {fields && (
        <p className="text-red-900 rounded-lg mb-5 text-xl bottom-0 p-2 bg-red-100 animate-[slideup_0.5s] absolute transition-all duration-150 ease-in ">Please add a Post</p>
      )}
      <div style={{background:'linear-gradient(260deg, rgba(158,112,191,0.8015717092337917) 0%, rgba(190,230,231,0.7799607072691552) 100%)'}} className=" flex flex-col justify-center lg:p-5 p-5 lg:w-4/5 rounded-lg  w-full">
        <div className=' flex  justify-between'>
        <div className=' flex flex-col'>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="outline-none md:w-auto w-[170px] text-2xl lg:text-4xl md:text-2xl font-extrabold placeholder:text-gray-700 bg-transparent  p-2"
          />
                    <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What your Post is about"
            className="md:w-auto w-[190px] outline-none text-base sm:text-lg placeholder:text-gray-500 bg-transparent p-2"
          />
          <input
            type="url"
            vlaue={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className=" md:w-auto w-[190px] outline-none text-base sm:text-lg placeholder:text-gray-500  text-gray-50 bg-transparent p-2"
          />
        </div>

          <div className=' flex flex-col mt-3 mr-[20px]  '>
              <p className="mb-2 font-normal xl:text-xl lg:text-xl md:text-lg text-sm  text-[#d8ebe9] mt-1 ">Post Category</p>
              <FormControl  className=' outline-none border-none rounded-[5px] bg-slate-300  w-[90px] md:w-[130px] bg-opacity-50' size="small">
      <InputLabel sx={{color:'#240861'}} className=' text-2xl font-extrabold'  id="demo-select-small-label">Select Category</InputLabel>
      <Select
      className='text-sky-100 md:w-[130px] w-[90px]'
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={category}
        label='select catagoryyt'
        onChange={handleChange}
      
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      {categories?.map((items,idx)=>{
        return(
          <MenuItem sx={{background:'#190247', color:category === items?.name?'#190247':'whitesmoke'}} className='text-sky-100 bg-black hover:text-black' value={items?.name}>{items?.name}</MenuItem>
        )
      })}
      </Select>
    </FormControl>
            </div>
        </div>

        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 rounded-lg p-3 w-full h-420">
            {loading && (
              <Spinner />
            )}
            {
              wrongImageType && (
                <p>It's wrong file type.</p>
              )
            }
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col mt-10 justify-center items-center">
                    <p className="font-bold text-2xl text-lime-200 animate-bounce">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg text-sky-200 animate-[slideleft_0.5s]">Click to upload</p>
                  </div>

                  <p className="mt-32 text-gray-100 animate-[slideright_0.5s]">
                  Use high-quality JPG, JPEG, SVG, PNG, GIF
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <Img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-row justify-between gap-6 lg:pl-5 mt-5 w-full">
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center  rounded-lg ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full border-[2px] border-sky-200"
                alt="user-profile"
              />
              <p className="font-bold text-pink-950 animate-[slideleft_0.5s]">{user.userName}</p>
            </div>
          )}
              <button
              style={{background:'linear-gradient(260deg, rgba(134,99,141,0.8240546218487395) 0%, rgba(244,117,117,0.7799607072691552) 100%)'}}
                type="button"
                onClick={savePin}
                className=" border border-amber-100 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Creat Post
              </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;