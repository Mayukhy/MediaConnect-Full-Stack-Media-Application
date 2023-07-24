# MediaConnect-Full-Stack-Media-Application
A full stack media application where user can login by using there google accounts and post images with with title and details, can comment to a perticular post, can give reaction, can view profile page and much more
React js, Sanity.Io, Tailwind Css, MUI are used

I have made a mistake that I deleted the media_backend repository and I can't recover that so I am giving some importent files along with media_frontend
index.js,like.js,love.js,pin.js,posted.js,profilebg.js & postedBy.js these fils are comes under the folder named in Schemas of media_backend

sanity.cli.js and sanity.config.js these files are also comes under  media_backend

# sanity.cli.js code
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'your Id',
    dataset: 'mediaapp'
  }
})

# sanity.config.js code 
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'gold-heron',

  projectId: 'Your Id',
  dataset: 'mediaapp',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

  # screenshots
![MediaConnect - Google Chrome 7_24_2023 1_55_59 PM](https://github.com/Mayukhy/MediaConnect-Full-Stack-Media-Application/assets/107027766/646825b8-6f6b-4608-a7c9-6f3f6fa54e7d)


![MediaConnect - Google Chrome 7_20_2023 12_26_06 PM](https://github.com/Mayukhy/MediaConnect-Full-Stack-Media-Application/assets/107027766/074b7982-e36c-4e3a-8394-ba8f3cb11a89)


![MediaConnect - Google Chrome 7_24_2023 1_56_24 PM](https://github.com/Mayukhy/MediaConnect-Full-Stack-Media-Application/assets/107027766/f5e38440-e861-484f-95a6-be463be0431e)


![MediaConnect - Google Chrome 7_24_2023 1_57_13 PM](https://github.com/Mayukhy/MediaConnect-Full-Stack-Media-Application/assets/107027766/293a00e1-5078-49b2-a097-01bf596cdf29)

![MediaConnect - Google Chrome 7_24_2023 1_57_29 PM](https://github.com/Mayukhy/MediaConnect-Full-Stack-Media-Application/assets/107027766/7a438d95-6c6a-4327-b6d0-20bd5a4535d2)


