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
