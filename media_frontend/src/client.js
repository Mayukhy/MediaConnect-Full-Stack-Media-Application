import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';


export const client = createClient({
  projectId: 'ayhihq4k',
  dataset: 'mediaapp',
  apiVersion: '2021-10-21',
  useCdn: true,
  token: 'skdgCJKeX8EV8Cdqdscs9bJcM5XOGX2XVNkgFVP0LuBzIsw1szu6lnTF4rMLBqxWC6UMt381vuXSFaVRe3qKjMPKYFxhEancdPtn1vnu5TZ8r86VzU78cOQi3AQCbyaDIsq89n76uPVhKJ9ufkmotYf5miR6Vwg8LGK0hkm5GQ1AIOA7Lv0I',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);