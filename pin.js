export default {
    name: 'pin',
    title: 'Pin',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'about',
        title: 'About',
        type: 'string',
      },
      {
        name: 'destination',
        title: 'Destination',
        type: 'url',
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'userId',
        title: 'UserId',
        type: 'string',
      },
      {
        // the type is comes from postedBy.js file
        name: 'postedBy',
        title: 'PostedBy',
        type: 'postedBy',
      },
      {
        // the type is comes from save.js file
        name: 'save',
        title: 'Save',
        type: 'array',
        of: [{ type: 'save' }],
      },
      {
              // the type is comes from save.js file
              name: 'like',
              title: 'Like',
              type: 'array',
              of: [{ type: 'like' }],
            },
      {
        name: 'comments',
        title: 'Comments',
        type: 'array',
        of: [{ type: 'comment' }],
      },
    ],
  };