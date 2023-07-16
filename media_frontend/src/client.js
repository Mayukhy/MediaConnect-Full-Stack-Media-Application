import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';


export const client = createClient({
  projectId: 'your ProjectId',
  dataset: 'mediaapp',
  apiVersion: '2021-10-21',
  useCdn: true,
  token: 'Your Token',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
