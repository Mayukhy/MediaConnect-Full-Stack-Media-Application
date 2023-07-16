import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { client } from '../client'
import Masonrylayout from './Masonrylayout'
import Spinner from './Spinner'
import { feedQuery,searchQuery } from '../utils/data'
export default function Feed({user}) {
    const [pins, setPins] = useState(null);
    const [loading,setloading] = useState(false)
    const { categoryId } = useParams();

    useEffect(() => {
      if (categoryId) {
        setloading(true);
        const query = searchQuery(categoryId);
        client.fetch(query).then((data) => {
          setPins(data);
          setloading(false);
          console.log(pins)
        });
      } else {
        setloading(true);
        client.fetch(feedQuery).then((data) => {
          setPins(data);
          setloading(false);
          console.log(pins)
        });
      }
    }, [categoryId]);

  return (
    <div>
      {loading?
     ( <div>
        <Spinner massage={ categoryId?`We Are Loading ${categoryId} Feeds`: `We Are Loading New Feeds`} />
      </div>):
      (
        <div>
 <Masonrylayout pins={pins} user={user} />
        </div>
      )
    }
    </div>
  )
}
