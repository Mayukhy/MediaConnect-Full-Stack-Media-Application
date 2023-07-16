export const userQuery = (userId)=>{
    const query = `*[_type == 'user' && _id == '${userId}']` 
    return query
}

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;
  
  export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                userName,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            }`;
    return query;
  };

  export const categories = [
    {
      name: 'science',
      image: 'https://www.training.com.au/wp-content/uploads/science-stem-feature.png',
    },
    {
      name: 'sports',
      image: 'https://img.freepik.com/free-vector/sport-equipment-concept_1284-13034.jpg',
    },
    {
      name: 'abstract',
      image: 'https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg',
    },
    {
      name: 'codding',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kaW5nfGVufDB8fDB8fHww&w=1000&q=80',
    },
    {
      name: 'photo',
      image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg',
    },
    {
      name: 'food',
      image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
    },
    {
      name: 'nature',
      image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
    },
    {
      name: 'art',
      image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
    }, {
      name: 'travel',
      image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg',
    },
    {
      name: 'quotes',
      image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg',
    }, {
      name: 'pets',
      image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
    }, {
      name: 'movies',
      image: 'https://media.istockphoto.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=0&k=20&c=JN4E5qJgcq3qm89rSc2BIJT6AZ80MvRJie__r3OENY8=',
    },
    {
      name: 'other',
      image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
    },
  ];

  
export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    like[]{
      _key,
      like,
      postedBy->{
        _id,
        userName,
      },
    },
    love[]{
      _key,
      love,
      postedBy->{
        _id,
        userName,
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

  export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };


  export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };

  export const addQuery = `*[_type == "profilebg"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    postedBy->{
      _id,
      userName,
      image
    },
      } `;