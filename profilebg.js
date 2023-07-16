export default {
    name: "profilebg",
    title: "profilebg", // name of the model
    type: "document",
    fields: [
      {
        name: "image", // name of the field
        title: "Image",
        // photos are identified in the sanity database by the keyword image
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: 'postedBy',
        title: 'PostedBy',
        type: 'postedBy',
      },
      {
        name: 'userId',
        title: 'UserId',
        type: 'string',
      },
    ],
  };