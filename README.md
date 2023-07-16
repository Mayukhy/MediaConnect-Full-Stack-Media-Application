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
    projectId: 'ayhihq4k',
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

  projectId: 'ayhihq4k',
  dataset: 'mediaapp',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

  # screenshots
![MediaConnect - Google Chrome 7_16_2023 10_34_16 PM](https://github.com/Mayukhy/MediaConnect-Full-Stack-Media-Application/assets/107027766/2b5e6d7a-39f4-48ab-8351-4b59940aec4c)

![MediaConnect - Google Chrome 7_16_2023 10_35_17 PM](https://github.com/Mayukhy/MediaConnect-Full-Stack-Media-Application/assets/107027766/3af14dc9-65f5-4c94-8ee2-e1157361412d)


![MediaConnect - Google Chrome 7_16_2023 10_36_30 PM](https://github.com/Mayukhy/MediaConnect-Full-Stack-Media-Application/assets/107027766/afcadd7d-e486-4e38-a595-39bb8a678a7b)


![MediaConnect - Google Chrome 7_16_2023 10_38_17 PM](https://github.com/Mayukhy/MediaConnect-Full-Stack-Media-Application/assets/107027766/db0b9422-1cc1-48b7-802d-63fee0f6a69c)


![MediaConnect - Google Chrome 7_16_2023 10_38_32 PM](https://github.com/Mayukhy/MediaConnect-Full-Stack-Media-Application/assets/107027766/6a9ddbd9-e47d-4e23-ab29-07d40b07d53d)




